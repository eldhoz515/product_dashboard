import { Link } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { connect } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function Edit({ appState, putDesc, putData, delCategory, addCategory, delBM, addBM, putTRL }) {
    const navigate = useNavigate();
    let description = '';
    useEffect(() => { getData(); }, []);
    async function getData() {
        try {

            const response = await fetch("https://api-test.innoloft.com/product/6781/");
            const data = await response.json();
            const trlRes = await fetch("https://api-test.innoloft.com/trl/");
            const trls = await trlRes.json();
            putTRL(trls);
            putData(data);
        } catch { }
    }
    function send(event) {
        putDesc(description);
        fetch("https://api-test.innoloft.com/product/6781/", { method: "PUT", body: JSON.stringify(appState) }).then((response) => response.json()).then((data) => console.log(data));
        event.currentTarget.textContent = "Saved";
        event.currentTarget.style.backgroundColor = "rgba(0,0,0,0.2)";
        setTimeout(() => {
            navigate('/product')
        }, 500);
    }
    return (
        <>
            <div className="ml-10">
                <div className="text-white text-sm px-4 py-1 w-fit rounded-xl text-gray-700 mt-10 ml-auto mr-10 font-raleway" style={{ backgroundColor: appState.config.mainColor || '' }}>
                    <Link to="/product" >↩️ Exit</Link>
                </div>
                {appState.name ?
                    <>
                        <div className="mt-10 font-poppins text-sm">Edit Description</div>
                        <ReactQuill className="mt-5 w-5/6" value={appState.description} onChange={(content) => { description = content; }} />
                        <div className="mt-10 font-poppins text-sm">Edit Categories</div>
                        <div className="mt-5 flex gap-x-3">
                            <input className="input" ></input>
                            <div className="px-2 py-1 rounded-xl cursor-pointer font-raleway text-white" style={{ backgroundColor: appState.config.mainColor || 'black' }} onClick={(event) => { addCategory(event.target.previousSibling.value) }}>Add</div>
                        </div>
                        <div className="mt-5 flex gap-3 my-2 flex-wrap">
                            {appState.categories.map((category) => <div className="editAttr"><span>{category.name}</span><span className="rounded-full bg-gray-400 w-fit px-1 ml-2 cursor-pointer" onClick={(event) => { delCategory(event.target.previousSibling.textContent) }}>X</span></div>)}
                        </div>
                        <div className="mt-10 font-poppins text-sm">Edit Business Models</div>
                        <div className="mt-5 flex gap-x-3">
                            <input className="input" ></input>
                            <div className="px-2 py-1 rounded-xl cursor-pointer font-raleway text-white" style={{ backgroundColor: appState.config.mainColor || 'black' }} onClick={(event) => { addBM(event.target.previousSibling.value) }}>Add</div>
                        </div>
                        <div className="mt-5 flex gap-3 my-2 flex-wrap">
                            {appState.businessModels.map((bm) => <div className="editAttr"><span>{bm.name}</span><span className="rounded-full bg-gray-400 w-fit px-1 ml-2 cursor-pointer" onClick={(event) => { delBM(event.target.previousSibling.textContent) }}>X</span></div>)}
                        </div>
                        {appState.trls && <>
                            <div className="mt-10 font-poppins text-sm">Edit TRL</div>
                            <select className="mt-5 w-fit max-w-full text-slate-500 font-raleway text-sm bg-gray-200 rounded-xl p-1">
                                {appState.trls.map((trl) => (<option key={trl.name} value={trl.name} selected={trl.name == appState.trl.name}>
                                    {trl.name}
                                </option>))}
                            </select></>}
                        <div className="px-3 py-1 w-fit mx-auto rounded-3xl my-10 cursor-pointer text-white" style={{ backgroundColor: appState.config.mainColor || 'black' }} onClick={send}>Save</div>
                    </>
                    : <></>}
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({ appState: state });
const mapDispatchToProps = (dispatch) => ({ putDesc: (data) => { dispatch({ type: 'putDesc', data: data }) }, putData: (data) => dispatch({ type: 'putData', data: data }), delCategory: (data) => dispatch({ type: 'delCategory', data: data }), addCategory: (data) => dispatch({ type: 'addCategory', data: data }), delBM: (data) => dispatch({ type: 'delBM', data: data }), addBM: (data) => dispatch({ type: 'addBM', data: data }), putTRL: (data) => dispatch({ type: 'putTRL', data: data }) });

export default connect(mapStateToProps, mapDispatchToProps)(Edit);