import { connect } from "react-redux";

function Header({ appState }) {
  return (
    <>
      <div className="h-10 w-full flex items-center" style={{ backgroundColor: appState.config.mainColor || '' }}>
        <img className="h-3/6 ml-2 filter invert grayscale" src={ appState.config.logo || ''}></img>
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({ appState: state });

export default connect(mapStateToProps)(Header);
