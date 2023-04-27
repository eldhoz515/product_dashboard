import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";

function Nav({ appState }) {
    return (
        <>
            <div className="flex justify-center w-full  space-x-10">
                <NavLink className="nav" to={"/"} style={({ isActive }) => ({ backgroundColor: isActive ? (appState.config.mainColor || '') : '', color: isActive ? 'white' : 'black' })}>Home</NavLink>
                <NavLink className="nav" to={"/product"} style={({ isActive }) => ({ backgroundColor: isActive ? (appState.config.mainColor || '') : '', color: isActive ? 'white' : 'black' })}>Product</NavLink>
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({ appState: state });

export default connect(mapStateToProps)(Nav);