import axios from "axios";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import CateList from "./shop/CateList";
import Itm from "./shop/Itm";
import List from "./shop/List";
import ListAll from "./shop/ListAll";


const App = () => {

    const [shopData, setShopData] = useState([]);
    const url = 'https://desipossa.github.io/shop_cra/assets/data.json'

    const getData = async () => {
        const r = await axios.get(url);
        setShopData(r.data);
    }

    useEffect(() => {
        getData();
    }, []);

    const originalItm = shopData.map(it => it.category);
    const filterItm = originalItm.filter(Boolean);
    const categoryItm = [...new Set(filterItm)];

    console.log(categoryItm)

    return (
        <Routes>
            <Route path="/" element={<Layout categoryItm={categoryItm} />}>
                <Route index element={<List />} />
                <Route path="all" element={<ListAll shopData={shopData} />} />
                <Route path=":cate" element={<CateList shopData={shopData} />} />
                <Route path="detail/:itm" element={<Itm shopData={shopData} />} />
            </Route>
        </Routes>
    )
}

export default App;