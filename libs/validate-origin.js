const validateOrigins = input => {
    const VALID = ['http://localhost:8000', 'https://suprdev.netlify.app'];
    return VALID.some(origin => origin === input);
};

export default validateOrigins;