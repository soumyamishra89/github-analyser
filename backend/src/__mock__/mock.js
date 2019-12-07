const mockRequest = (path = '', params = {}, query = {}, additionalInfo = {}) => {
    return {
      path,
      params,
      query,
      ...additionalInfo
    };
};

const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockImplementation((status) => {
        res.statusCode = status;
        return res;
    });
    res.json = jest.fn().mockImplementation((json) => {
        res.statusCode = res.statusCode || 200;
        res.data = json;
        return res;
    });
    res.send = jest.fn().mockImplementation((data) => {
        res.statusCode = res.statusCode || 200;
        res.data = data;
        return res;
    });
    
    return res;
};

export default {
    mockRequest,
    mockResponse
}