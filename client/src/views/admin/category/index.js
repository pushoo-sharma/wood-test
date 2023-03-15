/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Box, Flex, Grid, Spinner } from "@chakra-ui/react";

// Custom components
import Banner from "views/admin/category/Banner";

// Assets
import React from "react";
import { useParams } from "react-router-dom";
import { useCategoryProducts } from "hooks/useCategoryProducts";

export default function Overview() {
  const { categoryId } = useParams();

  const { categoriesProducts, loading, refresh } =
    useCategoryProducts(categoryId);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {loading && (
        <Flex
          w="100%"
          h="100px"
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Spinner />
        </Flex>
      )}
      <Grid
        templateColumns={{
          base: "1fr",
          lg: "1.34fr 1.34fr 1.34fr",
        }}
        templateRows={{
          base: "repeat(3, 1fr)",
          lg: "1fr",
        }}
        gap={{ base: "20px", xl: "20px" }}
      >
        {categoriesProducts.map((product) => (
          <Banner
            key={product._id}
            product={product}
          />
        ))}
      </Grid>
    </Box>
  );
}
