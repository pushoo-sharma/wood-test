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
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
  Spinner,
  Button,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import { useAuth } from "contexts/AuthContext";
import { useCategories } from "hooks/useCategory";
import { useProducts } from "hooks/useProducts";
import { useSupplierProducts } from "hooks/useSupplierProducts";
import { useUsers } from "hooks/useUsers";
import React, { useState } from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
} from "react-icons/md";
import { useHistory } from "react-router-dom";
import CheckTable from "views/admin/default/components/CheckTable";
import ComplexTable from "views/admin/default/components/ComplexTable";
import CommonTable from "views/admin/default/components/CommonTable";
import DailyTraffic from "views/admin/default/components/DailyTraffic";
import PieCard from "views/admin/default/components/PieCard";
import Tasks from "views/admin/default/components/Tasks";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/admin/default/variables/columnsData";
import tableDataCheck from "views/admin/default/variables/tableDataCheck.json";
import tableDataComplex from "views/admin/default/variables/tableDataComplex.json";
import CategoryForm from "./categoryForm";
import { useMyOrders } from "hooks/useMyOrders";
import ProductForm from "./productForm";
import SupplyForm from "./supplyForm";
import CategoryCard from "../category/CategoryCard";
import { useOrders } from "hooks/useOrders";
import { useOrderHistory } from "hooks/useOrderHistory";

function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />
              }
            />
          }
          name="Earnings"
          value="$350.4"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name="Spend this month"
          value="$642.39"
        />
        <MiniStatistics growth="+23%" name="Sales" value="$574.34" />
        <MiniStatistics
          endContent={
            <Flex me="-16px" mt="10px">
              <FormLabel htmlFor="balance">
                <Avatar src={Usa} />
              </FormLabel>
              <Select
                id="balance"
                variant="mini"
                mt="5px"
                me="0px"
                defaultValue="usd"
              >
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="gba">GBA</option>
              </Select>
            </Flex>
          }
          name="Your balance"
          value="$1,000"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg="linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)"
              icon={<Icon w="28px" h="28px" as={MdAddTask} color="white" />}
            />
          }
          name="New Tasks"
          value="154"
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdFileCopy} color={brandColor} />
              }
            />
          }
          name="Total Projects"
          value="2935"
        />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <TotalSpent />
        <WeeklyRevenue />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <DailyTraffic />
          <PieCard />
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <ComplexTable
          columnsData={columnsDataComplex}
          tableData={tableDataComplex}
        />
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px">
          <Tasks />
          <MiniCalendar h="100%" minW="100%" selectRange={false} />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}

const CustomerDashboard = () => {
  const { loading, categories } = useCategories();
  const navigate = useHistory();
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
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap="20px"
        mb="20px"
      >
        {categories.map((category) => (
          <CategoryCard
            name={category.name}
            image={category.image}
            onClick={() => navigate.push(`/admin/category/${category._id}`)}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

const AdminDashboard = () => {
  const {
    products,
    loading: productLoading,
    refresh: productRefresh,
  } = useProducts();
  const { customers, suppliers, loading: userLoading } = useUsers();
  const {
    categories,
    refresh: categoryRefresh,
    loading: categoryLoading,
  } = useCategories();
  const { orders, downloadCsv, loading: orderLoading } = useOrders();

  const { ordersHistory, loading: orderHistoryLoading } = useOrderHistory();

  const [isOpen, setIsOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);

  const [defaultCategory, setDefaultCategory] = useState(null);
  const [defaultProduct, setDefaultProduct] = useState(null);

  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);
  const closeProduct = () => setIsProductOpen(false);
  const openProduct = () => setIsProductOpen(true);

  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const customersColumn = [
    {
      Header: "NAME",
      accessor: "name",
    },
    {
      Header: "Phone number",
      accessor: "phoneNumber",
    },
    {
      Header: "DATE",
      accessor: "updatedAt",
    },
  ];
  const suppliersColumn = [
    {
      Header: "NAME",
      accessor: "name",
    },
    {
      Header: "Phone number",
      accessor: "phoneNumber",
    },
    {
      Header: "Company Name",
      accessor: "companyName",
    },
    {
      Header: "Identifier",
      accessor: "identifier",
    },
    {
      Header: "DATE",
      accessor: "updatedAt",
    },
  ];
  const categoryColumn = [
    {
      Header: "NAME",
      accessor: "name",
    },
    {
      Header: "DATE",
      accessor: "updatedAt",
    },
    {
      Header: "",
      type: "EDIT_ACTION",
      accessor: "none",
    },
  ];
  const productsColumn = [
    {
      Header: "NAME",
      accessor: "name",
    },
    {
      Header: "Identifier",
      accessor: "identifier",
    },
    {
      Header: "DATE",
      accessor: "updatedAt",
    },
    {
      Header: "",
      type: "EDIT_ACTION",
      accessor: "none",
    },
  ];
  const ordersColumn = [
    {
      Header: "CUSTOMER",
      accessor: "customer.name",
    },
    {
      Header: "Product",
      accessor: "supply.product.name",
    },
    {
      Header: "Supplier",
      accessor: "supply.supplier.name",
    },
    {
      Header: "Price",
      accessor: "supply.price",
    },
    {
      Header: "Quantity",
      accessor: "quantity",
    },
    {
      Header: "DATE",
      accessor: "updatedAt",
    },
  ];
  const ordersHistoryColumn = [
    {
      Header: "CUSTOMER",
      accessor: "customer.name",
    },
    {
      Header: "Product",
      accessor: "product.name",
    },
    {
      Header: "Total Quantity",
      accessor: "totalQuantity",
    },
    {
      Header: "Total Cost",
      accessor: "totalCost",
    },
    {
      Header: "DATE",
      accessor: "updatedAt",
    },
  ];

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />
              }
            />
          }
          name="Products"
          value={products.length}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name="Customers"
          value={customers.length}
        />
        <MiniStatistics name="Suppliers" value={suppliers.length} />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <CommonTable
          loading={userLoading}
          columnsData={customersColumn}
          tableData={customers}
          name="Customers"
        />
        <CommonTable
          loading={categoryLoading}
          columnsData={categoryColumn}
          tableData={categories}
          name="Categories"
          onCellEdit={(value) => {
            setDefaultCategory(value);
            open();
          }}
          action={
            <Button
              onClick={() => {
                open();
                setDefaultCategory(null);
              }}
            >
              Create
            </Button>
          }
        />
      </SimpleGrid>
      <CommonTable
        loading={productLoading}
        columnsData={productsColumn}
        tableData={products}
        name="Products"
        onCellEdit={(value) => {
          setDefaultProduct(value);
          openProduct();
        }}
        action={
          <Button
            onClick={() => {
              openProduct();
              setDefaultCategory(null);
            }}
          >
            Create
          </Button>
        }
      />
      <CommonTable
        loading={orderHistoryLoading}
        columnsData={ordersHistoryColumn}
        tableData={ordersHistory}
        name="Orders History"
      />
      <CommonTable
        loading={orderLoading}
        columnsData={ordersColumn}
        tableData={orders}
        name="Orders"
        action={<Button onClick={() => downloadCsv()}>Download CSV</Button>}
      />
      <CommonTable
        loading={userLoading}
        columnsData={suppliersColumn}
        tableData={suppliers}
        name="Suppliers"
      />
      <CategoryForm
        open={isOpen}
        onClose={close}
        defaultCategory={defaultCategory}
        onSave={() => {
          categoryRefresh();
          close();
        }}
      />
      <ProductForm
        open={isProductOpen}
        onClose={closeProduct}
        defaultProduct={defaultProduct}
        categories={categories}
        onSave={() => {
          productRefresh();
          closeProduct();
        }}
      />
    </Box>
  );
};

const SupplierDashboard = () => {
  const { supplies, loading: supplyLoading, refresh } = useSupplierProducts();
  const { products, loading: productLoading } = useProducts();
  const { orders, loading: orderLoading } = useMyOrders();

  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");

  const [isOpen, setIsOpen] = useState(false);
  const [defaultProductSupply, setDefaultProduct] = useState(null);
  const close = () => setIsOpen(false);
  const open = () => setIsOpen(true);

  const supplyColumn = [
    {
      Header: "NAME",
      accessor: "product.name",
    },
    {
      Header: "Stock",
      accessor: "stock",
    },
    {
      Header: "Price",
      accessor: "price",
    },
    {
      Header: "Identifier",
      accessor: "product.identifier",
    },
    {
      Header: "DATE",
      accessor: "updatedAt",
    },
    {
      Header: "",
      type: "EDIT_ACTION",
      accessor: "none",
    },
  ];
  const ordersColumn = [
    {
      Header: "CUSTOMER",
      accessor: "customer.name",
    },
    {
      Header: "Product",
      accessor: "supply.product.name",
    },
    {
      Header: "Price",
      accessor: "supply.price",
    },
    {
      Header: "Stock",
      accessor: "supply.stock",
    },
    {
      Header: "Quantity",
      accessor: "quantity",
    },
    {
      Header: "DATE",
      accessor: "updatedAt",
    },
  ];
  const productsColumn = [
    {
      Header: "NAME",
      accessor: "name",
    },
    {
      Header: "Identifier",
      accessor: "identifier",
    },
    {
      Header: "DATE",
      accessor: "updatedAt",
    },
  ];

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdBarChart} color={brandColor} />
              }
            />
          }
          name="Products Supplies"
          value={supplies.length}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w="56px"
              h="56px"
              bg={boxBg}
              icon={
                <Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />
              }
            />
          }
          name="Orders"
          value={orders.length}
        />
      </SimpleGrid>
      <CommonTable
        loading={supplyLoading}
        columnsData={supplyColumn}
        tableData={supplies}
        name="Supplies"
        onCellEdit={(value) => {
          setDefaultProduct(value);
          open();
        }}
        action={
          <Button
            onClick={() => {
              open();
              setDefaultProduct(null);
            }}
          >
            Create
          </Button>
        }
      />
      <CommonTable
        loading={productLoading}
        columnsData={productsColumn}
        tableData={products}
        name="Products"
      />
      {orders && (
        <CommonTable
          loading={orderLoading}
          columnsData={ordersColumn}
          tableData={orders}
          name="Orders"
        />
      )}
      <SupplyForm
        open={isOpen}
        onClose={close}
        defaultProductSupply={defaultProductSupply}
        products={products}
        onSave={() => {
          refresh();
          close();
        }}
      />
    </Box>
  );
};

export default function Dashboard() {
  const { user } = useAuth();
  if (!user.phoneNumber)
    return (
      <Flex w="100%" h="100px" alignItems={"center"} justifyContent={"center"}>
        <Spinner />
      </Flex>
    );
  if (user.role === 2) return <CustomerDashboard />;
  if (user.role === 1) return <SupplierDashboard />;
  if (user.role === 0) return <AdminDashboard />;
  return <UserReports />;
}
