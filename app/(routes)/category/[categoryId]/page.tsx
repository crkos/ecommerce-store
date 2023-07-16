import {FC} from "react";
import getProducts from "@/actions/GetProducts";
import getSizes from "@/actions/GetSizes";
import getColors from "@/actions/GetColors";
import getCategory from "@/actions/GetCategory";
import Container from "@/components/ui/Container";
import Billboard from "@/components/Billboard";
import Filter from "@/app/(routes)/category/[categoryId]/components/Filter";
import NoResults from "@/components/ui/NoResults";
import ProductCard from "@/components/ui/ProductCard";
import MobileFilters from "@/app/(routes)/category/[categoryId]/components/MobileFilters";

export const revalidate = 0;
interface CategoryProps {
    params: {
        categoryId: string
    },
    searchParams: {
        colorId: string,
        sizeId: string
    }
}

const CategoryPage: FC<CategoryProps> = async ({params, searchParams}) => {

    const products = await getProducts({
        categoryId: params.categoryId,
        colorId: searchParams.colorId,
        sizeId: searchParams.sizeId
    });

    const sizesData = getSizes();
    const colorsData = getColors();
    const categoriesData = getCategory(params.categoryId);

    const [sizes, colors, category] = await Promise.all([sizesData, colorsData, categoriesData]);


    return (
        <div className="bg-white ">
            <Container>
                <Billboard data={category.billboard} />
                <div className="px-4 sm:px-6 lg:px-8 pb-24">
                    <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
                        <MobileFilters sizes={sizes} colors={colors}/>
                        <div className="hidden lg:block">
                            <Filter valueKey="sizeId" name="Sizes" data={sizes}/>
                            <Filter valueKey="colorId" name="Colors" data={colors}/>

                        </div>
                        <div className="mt-6 lg:col-span-4 lg:mt-0">
                            {products.length === 0 && <NoResults />}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {products.map((product) => (
                                    <div key={product.id}>
                                        <ProductCard data={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default CategoryPage;