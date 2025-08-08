const pick = (obj, keys) => {
    const finalObj = {};
    for (const key of keys) {
        if (Object.hasOwnProperty.call(obj, key)) {
            finalObj[key] = obj[key];
        }
    }
    return finalObj;
};
export default pick;
//# sourceMappingURL=pick.js.map