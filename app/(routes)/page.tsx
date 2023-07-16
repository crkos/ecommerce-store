import React from 'react';
import Container from "@/components/ui/Container";
import Billboard from "@/components/Billboard";
import getBillboard from "@/actions/GetBillboard";
import ProductList from "@/components/ProductList";
import getProducts from "@/actions/GetProducts";

const HomePage = async () => {

    const billboardData = getBillboard("4e71b3ab-55c0-4cfc-aef8-fc7f9ce18809");
    const productsData = getProducts({isFeatured: true})

    const [billboard, products] = await Promise.all([billboardData, productsData]);

    return (
        <Container>
            <div className="space-y-10 pb-10">
                <Billboard data={billboard}/>
            <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
                <ProductList title="Featured products" items={products}/>
            </div>
            </div>
        </Container>
    );
};

export default HomePage;