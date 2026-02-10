import { http } from "@/lib/api-client";
import { MainMenu, NavCategory, NAVIGATION_DATA } from "@/constants/navigation";

const CACHE_KEY = 'app_categories_cache';
const CACHE_TIME = 60 * 60 * 1000; // 1 giờ

/**
 * Fetch and process categories for the main navigation menu
 * Includes 3 levels (Root -> Level 1 -> Level 2)
 * Implements batching to avoid 429 Errors and localStorage caching
 */
export async function getHeaderCategories(): Promise<MainMenu[]> {
    try {
        // 1. Check Cache first (Client-side only)
        if (typeof window !== 'undefined') {
            const cachedData = localStorage.getItem(CACHE_KEY);
            if (cachedData) {
                try {
                    const { data, timestamp } = JSON.parse(cachedData);
                    if (Date.now() - timestamp < CACHE_TIME) {
                        return data;
                    }
                } catch (e) {
                    console.error("Cache parsing error", e);
                }
            }
        }

        // 2. Fetch Root Categories (Level 0)
        const response: any = await http.get('site/productcategories/parent/0');
        const rootItems = response.items || [];

        // 3. Concurrently fetch Level 1 children for each Root
        const childrenResults = await Promise.all(
            rootItems.map(async (root: any) => {
                try {
                    const res: any = await http.get(`site/productcategories/parent/${root.id}`);
                    const level1Items = res.items || [];

                    // Fetch Level 2: Batching to balance speed and safety (avoid 429)
                    const level1WithLevel2 = [];
                    const batchSize = 3;
                    for (let i = 0; i < level1Items.length; i += batchSize) {
                        const batch = level1Items.slice(i, i + batchSize);
                        const batchResults = await Promise.all(
                            batch.map(async (l1: any) => {
                                try {
                                    const res2: any = await http.get(`site/productcategories/parent/${l1.id}`);
                                    return {
                                        ...l1,
                                        level2: res2.items || []
                                    };
                                } catch {
                                    return { ...l1, level2: [] };
                                }
                            })
                        );
                        level1WithLevel2.push(...batchResults);
                    }

                    return { parentId: root.id, children: level1WithLevel2 };
                } catch (err) {
                    return { parentId: root.id, children: [] };
                }
            })
        );

        // 4. Transform data into MainMenu structure
        const mappedCategories: MainMenu[] = rootItems.map((item: any) => {
            const l1Children = childrenResults.find(res => res.parentId === item.id)?.children || [];

            // Map Level 1 as Columns and Level 2 as Items
            const finalDropdownData: NavCategory[] = l1Children.map((l1: any) => ({
                title: l1.name.toUpperCase(),
                items: l1.level2.map((l2: any) => ({
                    label: l2.name,
                    slug: l2.seo_url
                }))
            }));

            return {
                title: item.name.toUpperCase(),
                slug: item.seo_url,
                dropdownData: finalDropdownData.length > 0 ? finalDropdownData : undefined
            };
        });

        // 5. Store in Cache
        if (typeof window !== 'undefined') {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                data: mappedCategories,
                timestamp: Date.now()
            }));
        }

        return mappedCategories;
    } catch (error) {
        console.error("Failed to fetch categories:", error);
        return NAVIGATION_DATA;
    }
}
