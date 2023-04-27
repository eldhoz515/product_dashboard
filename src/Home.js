import { connect } from "react-redux";

function Home({ appState }) {
    return (
        <>
            <div className="font-poppins font-bold text-5xl lg:text-7xl fixed inset-0 flex items-center justify-center z-[-1]" style={{ color: appState.config.mainColor || 'black' }}>Welcome..</div>
        </>
    );
}
const mapStateToProps = (state) => ({ appState: state });

export default connect(mapStateToProps)(Home);
