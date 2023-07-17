import Header from "../components/view/Header";
import Footer from "../components/view/Footer";
import "../style/style.css";
import "../style/menu.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Menu from "../components/view/Menu";
import Trucks from "../components/information/Trucks";
import Sims from "../components/information/Sims";
import Tablets from "../components/information/Tablets";
import Phones from "../components/information/Phones";


function App() {

    return (
        <BrowserRouter>
            <div id={'page-container'}>
                <Header/>
                <div className={'content'}>
                    <Menu/>

                    <div className={'content_c'}>
                        <div className={'content_cc'}>

                            <div className={'directory'}>assets/sim</div>

                            <div className={'main_content'}>
                                <Routes>
                                    <Route path="/trucks" element={<Trucks/>}/>
                                    <Route path="/assets/sims" element={<Sims/>}/>
                                    <Route path="/assets//tablets" element={<Tablets/>}/>
                                    <Route path="/assets/phones" element={<Phones/>}/>

                                </Routes>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer/>

            </div>
        </BrowserRouter>

    );

}

export default App;
