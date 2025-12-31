"strict mode";
module.exports = class Response {
    constructor() {
        this.status = "";
        this.errCode = "";
        this.errMsg = "";
        this.errDetail = "";
    }

    success() {
        this.status = "200";
        this.errCode = "00";
        return this;
    }

    invalidRequest(errDetail) {
        this.status = "200";
        this.errCode = "101";
        this.errMsg = "Invalid Request";
        if (errDetail) this.errDetail = errDetail;
        return this;
    }

    internalServerError(errDetail) {
        this.status = "200";
        this.errCode = "102";
        this.errMsg = "Internal Server Error";
        if (errDetail) this.errDetail = errDetail;
        return this;
    }

    apiKeyError(errDetail) {
        this.status = "200";
        this.errCode = "103";
        this.errMsg = "API Key Error";
        if (errDetail) this.errDetail = errDetail;
        return this;
    }

    dbError(errDetail) {
        this.status = "200";
        this.errCode = "103";
        this.errMsg = "DB Error";
        if (errDetail) this.errDetail = errDetail;
        return this;
    }

    repeatRedeemError(errDetail) {
        this.status = "200";
        this.errCode = "106";
        this.errMsg = "Coupon is already redeemed";
        if (errDetail) this.errDetail = errDetail;
        return this;
    }

    invalidCouponError(errDetail) {
        this.status = "200";
        this.errCode = "108";
        this.errMsg = "Coupon is invalid";
        if (errDetail) this.errDetail = errDetail;
        return this;
    }

    stockShortageError(errDetail) {
        this.status = "200";
        this.errCode = "155";
        this.errMsg = "Stock shortage";
        if (errDetail) this.errDetail = errDetail;
        return this;
    }

    SerialNumberDuplicateError(errDetail) {
        this.status = "200";
        this.errCode = "156";
        this.errMsg = "SerialNumber duplicate";
        if (errDetail) this.errDetail = errDetail;
        return this;
    }
    couponEndDateError(errDetail) {
        this.status = "200";
        this.errCode = "157";
        this.errMsg =
            "Coupon end_date can not be set after merchandise end_date";
        if (errDetail) this.errDetail = errDetail;
        return this;
    }
    couponMerchandiseStatusError(errDetail) {
        this.status = "200";
        this.errCode = "158";
        this.errMsg = "Wrong merchandise status";
        if (errDetail) this.errDetail = errDetail;
        return this;
    }
    couponNotFoundStatusError(errDetail) {
        this.status = "200";
        this.errCode = "159";
        this.errMsg = "coupon not found";
        if (errDetail) this.errDetail = errDetail;
        return this;
    }
    couponStartDateAfterEndDateError(errDetail) {
        this.status = "200";
        this.errCode = "160";
        this.errMsg = "Coupon start_date can not be set after end_date";
        if (errDetail) this.errDetail = errDetail;
        return this;
    }

    nullParameterError(errDetail) {
        this.status = "200";
        this.errCode = "161";
        this.errMsg = "parameter cannot be null";
        if (errDetail) this.errDetail = errDetail;
        return this;
    }
};
