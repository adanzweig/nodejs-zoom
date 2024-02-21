require('dotenv').config();

const express = require('express');
const axios = require('axios');


const app = express();
const port = 3000;

app.get('/',async (req,res)=>{
    const code = req.query.code;

    try{
        const response = await axios.post('https://zoom.us/oauth/token',null,{
            params:{
                grant_type: 'authorization_code',
                code:code,
                redirect_uri: process.env.REDIRECT_URI
            },
            headers:{
                'Authorization':`Basic ${Buffer.from(`${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`).toString('base64')}`
            }
        });
        res.send(response.data.access_token);    
    }catch(error){
        console.error('Error',error);
        res.send('Error');
    }
    
});

app.get('/auth/zoom',(req,res)=>{
    const clientId = process.env.ZOOM_API_KEY;
    const redirect_uri = encodeURIComponent(process.env.REDIRECT_URI);
    const responseType = 'code';
    const authorizationUrl = `https://zoom.us/oauth/authorize?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirect_uri}`;
    res.redirect(authorizationUrl);
});
app.get('/callback',async(req,res)=>{
    const code = req.query.code;
    if(!code){
        return res.status(400).send('No code provided');
    }
    try{
        const response = await axios.post('https://zoom.us/oauth/token',null,{params:{
            grant_type:'authorization_code',
            code,
            redirect_uri:process.env.REDIRECT_URI
        },headers:{
            'Authorization':`Basic ${Buffer.from(`${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`).toString('base64')}`,
            'Content-Type':'application/x-www-form-urlencoded'
        }});
        res.json(response.data);
    }catch(error){
        console.error('Error:',error);
        res.send('Error obtaining token');
    }
})
app.get('/refreshToken',async(req,res)=>{
    try{
        const refresh_token = req.query.refreshToken;

        const response = await axios.post('https://zoom.us/oauth/token',null,{
            params:{
                grant_type:'refresh_token',
                refresh_token
            },
            headers:{
                'Authorization':`Basic ${Buffer.from(`${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`).toString('base64')}`,
                'Content-Type':'application/x-www-form-urlencoded'
            }
        });

        res.json(response.data);

    }catch(error){
        console.error('Error',error);
        res.send('Error refreshing token')
    }
})

app.listen(port,()=>{
    console.log('Server running');
})