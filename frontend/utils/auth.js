const TOKEN_KEY = 'htam-emag';

export const getToken = () => {
    return localStorage.getItem(TOKEN_KEY);
}

export const login = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = 'http://ec2-18-206-164-193.compute-1.amazonaws.com:3000/login';
}

export const isAuth = () => {
    return getToken() !== null;
}
