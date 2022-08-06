module.exports  = {
    schema : {
        fullname: { type: "string", min: 6, max: 255 },
        email : { type: "email"},
        password: { type: "string", min:8, max:15 },
        phone: { type: "string" }
    }
};
