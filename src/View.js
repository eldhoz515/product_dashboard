import { useEffect } from "react";
import { connect } from "react-redux";
import Map from "./Map";
import { Link } from "react-router-dom";

function View({ appState, putData, setYtHeight }) {
    useEffect(() => {
        function handleResize() {
            const newHeight =
                window.innerHeight < window.innerWidth
                    ? window.innerHeight * 0.7
                    : (window.innerWidth * 9) / 16;
            setYtHeight(newHeight);
        }

        window.addEventListener("resize", handleResize);
        handleResize();
        getData();
    }, []);

    async function getData() {
        try {
            const response = await fetch("https://api-test.innoloft.com/product/6781/");
            const data = await response.json();
            putData(data);
        } catch { }
    }
    return (
        <>
            {appState.name ? (
                <>
                    <div className="text-white text-sm px-4 py-1 w-fit rounded-xl text-gray-700 mt-10 ml-auto mr-10 font-raleway" style={{ backgroundColor: appState.config.mainColor }}>
                        <Link to="/product/edit" >✏️ Edit</Link>
                    </div>
                    <div className="flex justify-center items-center mt-5 flex-wrap">
                        <div className="text-4xl font-poppins font-semibold" style={{ color: appState.config.mainColor || '' }}>{appState.name}</div>
                        <div className="ml-5 bg-gray-200 px-2 py-1 text-sm text-slate-500 rounded-xl font-raleway">{appState.type.name}</div>
                        <div className="basis-full h-3"></div>
                        <div className="ml-5 text-sm font-poppins font-semibold bg-gray-100 px-2 py-1 rounded-xl" style={{ color: appState.config.mainColor || '' }}>{appState.company.name}</div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center mt-6">
                        <img className="mx-10 h-64 md:mr-0" src={appState.picture}></img>
                        <div className="mt-10 mx-10 text-slate-600 break-words font-raleway">{appState.description}</div>
                    </div>
                    <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center mt-10 mx-10">
                        <div className="xl:mr-10">
                            <div className="font-poppins">Categories</div>
                            <div className="flex gap-3 my-2 flex-wrap">
                                {appState.categories.map((category) => <div className="attr">{category.name}</div>)}
                            </div>
                            <div className="font-poppins">Business Models</div>
                            <div className="flex gap-3 my-2 flex-wrap">
                                {appState.businessModels.map((bm) => <div className="attr">{bm.name}</div>)}
                            </div>
                            <div className="font-poppins">TRL</div>
                            <div className="flex gap-3 my-2 flex-wrap">
                                <div className="attr">{appState.trl.name}</div>
                            </div>
                            <div className="font-poppins">Cost</div>
                            <div className="flex gap-3 my-2 flex-wrap">
                                <div className="attr">{appState.investmentEffort}</div>
                            </div>
                        </div>
                        <div className="rounded-3xl overflow-hidden self-center mt-10 xl:mt-0 w-11/12" style={{ height: `${appState.ytHeight || 0}px` }}>
                            <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${appState.video.split('v=')[1]}`}></iframe>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-center items-center my-20 gap-10">
                        <div className="w-full md:w-1/3 flex flex-col items-center">
                            {appState.config.hasUserSection && <>
                                <img className="rounded-full w-1/4 md:w-1/3 mb-3" src={appState.user.profilePicture}></img>
                                <div className="font-poppins" >{`${appState.user.firstName} ${appState.user.lastName}`}</div>
                                <div className="font-raleway text-xs text-slate-500" >{appState.user.position}</div>
                                <div className="font-raleway text-xs text-slate-500" >{appState.user.email}</div></>}
                        </div>
                        <div className="rounded-3xl overflow-hidden w-4/6 md:w-1/3 sticky">
                            <Map address={appState.company.address}></Map>
                        </div>
                    </div>
                </>)
                : <></>}
        </>
    );
}


const mapStateToProps = (state) => ({ appState: state });
const mapDispatchToProps = (dispatch) => ({ putData: (data) => dispatch({ type: 'putData', data: data }), setYtHeight: (data) => dispatch({ type: 'ytHeight', data: data }) });

export default connect(mapStateToProps, mapDispatchToProps)(View);