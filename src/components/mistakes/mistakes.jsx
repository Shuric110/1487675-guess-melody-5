import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const Mistakes = (props) => {
  const {count} = props;

  const mistakes = new Array(count).fill(``);

  return (
    <div className="game__mistakes">
      {mistakes.map((it, i) => <div key={`mistake-${i}`} className="wrong" />)}
    </div>
  );
};

Mistakes.propTypes = {
  count: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  count: state.mistakes,
});

export {Mistakes};
export default connect(mapStateToProps)(Mistakes);
