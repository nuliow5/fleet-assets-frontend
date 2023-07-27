import Header from "../components/view/Header";
import Footer from "../components/view/Footer";
import "../style/style.css";
import "../style/menu.css";
import "../style/form.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Menu from "../components/view/Menu";
import Trucks from "../components/information/Trucks";
import Sims from "../components/information/Sims";
import Tablets from "../components/information/Tablets";
import Phones from "../components/information/Phones";
import AddNewSim from "../components/crude/sim/AddNewSim";
import EditSim from "../components/crude/sim/EditSim";
import DeleteSim from "../components/crude/sim/DeleteSim";
import DeletePhone from "../components/crude/phone/DeletePhone";


function App() {

    return (
        <BrowserRouter>
            <div id={'page-container'}>
                <Header/>
                <div className={'content'}>
                    <Menu/>

                    <div className={'content_c'}>
                        <div className={'content_cc'}>

                            {/*<div className={'directory'}>assets/sim</div>*/}

                            <div className={'main_content'}>
                                <div className={'main_content_cc'}>
                                    <Routes>
                                        <Route path="/trucks" element={<Trucks/>}/>
                                        <Route path="/assets/sims" element={<Sims/>}/>
                                        <Route path="/assets//tablets" element={<Tablets/>}/>
                                        <Route path="/assets/phones" element={<Phones/>}/>
                                        <Route path="/assets/sims/add-new-sim" element={<AddNewSim/>}/>
                                        <Route path="/assets/sims/edit-sim/:id" element={<EditSim/>}/>
                                        <Route path="/assets/sims/delete-sim/:id" element={<DeleteSim/>}/>
                                        <Route path="/assets/phones/delete-phone/:id" element={<DeletePhone/>}/>
                                    </Routes>
                                </div>
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
