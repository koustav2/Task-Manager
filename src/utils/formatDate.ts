import moment from "moment/moment";

const formatDate = (date: moment.MomentInput) => {
    return moment(date).format("DD/MM/YYYY");
};

export default formatDate;