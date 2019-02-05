import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { CardElement, injectStripe } from "react-stripe-elements";
import ErrorText from "../Generic/ErrorText";

class ProfilePayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      loading: false,
      showAddPayment: false
    };
  }
  submit = async e => {
    this.setState({ loading: true });
    let { token } = await this.props.stripe.createToken({ name: "Name" });
    if (token) {
      this.props.onAddNewPayment({
        token
      });
      this.setState({ loading: false });
      this.stripeRef.clear();
    }
    this.setState({ loading: false });
  };
  validateCard = e => {
    const errors = {};
    if (e.elementType === "card" && e.error !== undefined) {
      errors.message = e.error.message;
      this.setState({ errors });
    } else if (e.error === undefined) {
      this.setState({ errors: {} });
    }
  };
  onOpenAddPayment = () => this.setState({ showAddPayment: true });
  onCloseAddPayment = () => this.setState({ showAddPayment: false });

  render() {
    const { errors, loading, showAddPayment } = this.state;
    const { isError, isLoading, message, data } = this.props.payment;
    const {
      data: { customerId }
    } = this.props.userProfile;
    return (
      <div className="profile_module">
        <h3>Payment Methods</h3>
        <form className="payment_form">
          {customerId || (data.cardList && data.cardList.length) ? (
            !showAddPayment ? (
              <>
                <div className="card-details">
                  {data.cardList &&
                    data.cardList.map(card => (
                      <Fragment key={card.id}>
                        <div>{card.brand}</div>
                        <div> •••• •••• •••• {card.last4}</div>
                      </Fragment>
                    ))}
                </div>
                <button className="add-payment" onClick={this.onOpenAddPayment}>
                  Add New Payment Method
                </button>
              </>
            ) : (
              <>
                <CardElement
                  onChange={this.validateCard}
                  onReady={element => (this.stripeRef = element)}
                />
                {errors.message && <ErrorText text={errors.message} />}
                {isError && message && (
                  <div className="server_error">{message}</div>
                )}
                <button
                  type="button"
                  onClick={this.submit}
                  disabled={loading || isLoading}
                >
                  {loading || isLoading
                    ? "Adding New Payment Method..."
                    : "Add New Payment Method"}
                </button>
                <button onClick={this.onCloseAddPayment}>Cancel</button>
              </>
            )
          ) : (
            <>
              <CardElement
                onChange={this.validateCard}
                onReady={element => (this.stripeRef = element)}
              />
              {errors.message && <ErrorText text={errors.message} />}
              {isError && message && (
                <div className="server_error">{message}</div>
              )}
              <button
                type="button"
                onClick={this.submit}
                disabled={loading || isLoading}
              >
                {loading || isLoading
                  ? "Adding New Payment Method..."
                  : "Add New Payment Method"}
              </button>
            </>
          )}
        </form>
        {/* {customerId && <Link to="#">Cancel</Link>} */}
      </div>
    );
  }
}

export default injectStripe(ProfilePayment);
