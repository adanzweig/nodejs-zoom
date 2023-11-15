require('dotenv').config();
const axios = require('axios');

const token = process.env.TOKEN;

async function getMeetings(){
    try{
        const response = await axios.get('https://api.zoom.us/v2/users/me/meetings',{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });
        const data = response.data;
        return data;
    }catch(error){
        console.error('Error',error);
    }
}

async function createMeeting(topic, start_time,type,duration,timezone,agenda){
    try{
        const response = await axios.post('https://api.zoom.us/v2/users/me/meetings',{
            topic,
            type,
            start_time,
            duration,
            timezone,
            agenda,
            settings:{
                host_video:true,
                participant_video:true,
                join_before_host:false,
                mute_upon_entry:true,
                watermark:false,
                use_pmi:false,
                approval_type:0,
                audio:'both',
                auto_recording:'none'
            }
        },{
            headers:{
                'Authorization':`Bearer ${token}`
            },

        });
        const body = response.data;
        return body;
    }catch(error){
        console.error('Error',error);
    }
}

(async()=>{
    console.log(await getMeetings());
    console.log(await createMeeting('CodingWithAdo new meeting','2023-11-20T10:00:00',2,45,'UTC','Team meeting for future videos'));
    console.log(await getMeetings());
})()