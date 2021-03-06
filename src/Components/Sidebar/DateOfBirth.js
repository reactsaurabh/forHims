import React, { Component } from "react";
import { dateOfBirthFields as fields } from "../../constants/profile";
import { Field, reduxForm } from "redux-form";
import DateFormField from "../Generic/DateFormField";
import { connect } from "react-redux";
import { addDateOfBirthRequest } from "../../actions";

/**UI component for addding Date of Birth */
class DateOfBirth extends Component {
  /**Render fields for date of birth form */
  renderFields = () =>
    fields.map(({ name, placeholder }) => (
      <Field
        parse={value =>
          isNaN(parseInt(value, 10)) ? null : parseInt(value, 10)
        }
        component={DateFormField}
        name={name}
        label={placeholder}
        key={name}
      />
    ));

  /**Calls the action for adding date of birth
   * @param {Object} values values from redux form
   */
  handleSubmitDate = values => {
    var length = values.year.toString().length;
    if(length == 4)
    {
      const dateOfBirth = new Date(
        `${values.month}-${values.day}-${values.year}`
      );
      const { uid } = this.props.user.data;
      this.props.addDateOfBirthRequest({ uid, dateOfBirth });
    }
    
  };

  render() {
    const {
      additionalInfo: { isLoading, isError, message }
    } = this.props;
    return (
      <>
        {isLoading ? (
          <div className="login-loader">
            <div>Saving your Information...</div>
            <div>Hang tight</div>
            <div className="loader" />
          </div>
        ) : (
          <div className="cart_section">
            <div className="symbols">
              <div className="symbols-title">Cart</div>
              <ul>
                <li className="symbols1 active"> </li>
                <li className="symbols2"> </li>
                <li className="symbols3 "> </li>
                <li className="symbols4"> </li>
                <li className="symbols5"> </li>
              </ul>
            </div>
            <div className="cart-dob_section">
              <div className="dob_title">Date of Birth</div>
              <div>What is your date of birth?</div>
              <form className="dob_form">{this.renderFields()}</form>
              <button
                type="orange"
                className="next_btn"
                onClick={this.props.handleSubmit(this.handleSubmitDate)}
              >
                Submit Date
              </button>
              {isError && message && (
                <div className="server_error">{message}</div>
              )}
            </div>
          </div>
        )}
      </>
    );
  }
}

/**Validates the values from redux form before submitting
 * @param {Object} values values from the redux form
 * @returns {Object} error message for respective fields in an object with field as properties
 */
const validate = values => {
  const error = {};
  if (values.month < 0 || values.month > 12) {
    error.month = "Invalid Month";
  }
  if (values.day < 0 || values.day > 31) {
    error.day = "Invalid Day";
  }
  if (values.year > new Date().getFullYear() - 18) {
    error.year = "Invalid Year";
  }
  for (let value of fields) {
    if (!values[value.name]) {
      error[value.name] = "Required Field";
    }
  }
  return error;
};
const mapStateToProps = ({ user, profile: { additionalInfo } }) => ({
  user,
  additionalInfo
});
export default reduxForm({
  form: "dateForm",
  validate
})(
  connect(
    mapStateToProps,
    { addDateOfBirthRequest }
  )(connect(mapStateToProps)(DateOfBirth))
);
