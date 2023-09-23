import React, { useState } from 'react'
import Chatbot from 'react-chatbot-kit'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import { MainContainer,ChatContainer,MessageList,Message,MessageInput,TypingIndicator, MessageSeparator } from '@chatscope/chat-ui-kit-react'
import { json } from 'react-router-dom'
export const BankyBot = () => {
    //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
    const API_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDJhZGY1NjdjMWM0ZWM1Y2I0MmNlNiIsImlhdCI6MTY4NDIzMDk3NiwiZXhwIjoxNjg1MDk0OTc2fQ.n3Y51IDltcr9Iqizz8BxtnGpodr3v-PyRdFcwCn4FHg";
    const finacial_key =" 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";
    //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 (old Key)
    // https://platform.openai.com/account/api-keys to get API Key
    const [typing,setTyping] = useState(false);
    const [messages,setMessages] = useState([
        {
            message:"Hello ,I am BankyBot",
            sender:"BankyBot"
        },
        {
            message:"1.need to check balance",
            sender:"BankyBot"
        },
        {
            message:"2.Require Loan",
            sender:"BankyBot"
        },
        {
            message:"3.check refund and renewal",
            sender:"BankyBot"
        },
        {
            message:"4.Recommend a Product",
            sender:"BankyBot"
        },

    ])

    const handlesend = async (message)=>{
        console.log(message);
        const newMessage = {
            message:message,
            sender:"User",
            direction:"outgoing"
        }
        const newMessages = [...messages,newMessage];
        //update our message state
        setMessages(newMessages);
        //set a typing indicator (chatgpt is typing)
        setTyping(true)
        //process message to Bankybot (send it over and response)
        await processMessageToBankyBot(newMessages,message);
    }
    async function processMessageToBankyBot(chatMessages,message){
        let apimessages = chatMessages.map((messageObject)=>{
            let role="";
            if(messageObject.sender === 'BankyBot'){
                role="assistant"
            }
            else 
            {
                role="user"
            }
            return {
                role:role,content:messageObject.message
            }
        });

        //https://api.openai.com/v1/chat/completions
        if(message==="Balance"||message==="need to check balance")
        {
        await fetch("http://localhost:9000/api/v1/accounts",{
        method:"GET",
        headers:{
            "Authorization":"Bearer "+ API_KEY,
            "Content-Type":"application/json"
        },
        //body:JSON.stringify(apiRequestBody)
        }).then((data)=>{
            return data.json();
        }).then((data)=>{
            console.log(data);
                const desc="List of accounts and their balances";
                if(message==="Balance"||message==="need to check balance")
                {
                    setMessages(
                        [
                            ...chatMessages,{
                                message:desc,
                                sender:"BankyBot"
                            }
                        ]
                    );
                    const arr=[];
                    for(let i=0;i<data.length;i++)
                    {
                      arr.push("Accountname:"+data[i].fullname+"  Balance:"+data[i].initialbalance);
                      console.log(arr[i]);
                    }
                    setMessages(
                        [
                            ...chatMessages,{
                                message:JSON.stringify(arr.toString()),
                                sender:"BankyBot"
                            }
                        ]
                    );
                }
            setTyping(false);
        })
       }//checking balance 
       else if(message==="loan types"||message==="Loan types")
       {
        await fetch("http://localhost:9000/api/v1/loans",{
            method:"GET",
            headers:{
                "Authorization":"Bearer "+ API_KEY,
                "Content-Type":"application/json"
            },
            //body:JSON.stringify(apiRequestBody)
            }).then((data)=>{
                return data.json();
            }).then((data)=>{
                console.log(data);
                    const desc="List of Loans available";
                    if(message==="Loan types"||message==="loan types")
                    {
                        setMessages(
                            [
                                ...chatMessages,{
                                    message:desc,
                                    sender:"BankyBot"
                                }
                            ]
                        );
                        const arr=[];
                        for(let i=0;i<data.length;i++)
                        {
                         arr.push("type:"+data[i].type);
                        }
                        setMessages(
                            [
                                ...chatMessages,{
                                    message:JSON.stringify(arr.toString()),
                                    sender:"BankyBot"
                                }
                            ]
                        );
                    }
                setTyping(false);
            })
       }//loan types
       else if(message==="loan eligibility")
       {
        await fetch("http://localhost:9000/api/v1/loans",{
            method:"GET",
            headers:{
                "Authorization":"Bearer "+ API_KEY,
                "Content-Type":"application/json"
            },
            //body:JSON.stringify(apiRequestBody)
            }).then((data)=>{
                return data.json();
            }).then((data)=>{
                console.log(data);
                    const desc="List of Loans available";
                        setMessages(
                            [
                                ...chatMessages,{
                                    message:desc,
                                    sender:"BankyBot"
                                }
                            ]
                        );
                        const arr=[];
                        for(let i=0;i<data.length;i++)
                        {
                         arr.push("type:"+data[i].type+" Minimum age:"+data[i].Minimumage);
                        }
                        setMessages(
                            [
                                ...chatMessages,{
                                    message:JSON.stringify(arr.toString()),
                                    sender:"BankyBot"
                                }
                            ]
                        );
                    
                setTyping(false);
            })
       }//loan eligibilty
       else if(message==="loan amount")
       {
        await fetch("http://localhost:9000/api/v1/loans",{
            method:"GET",
            headers:{
                "Authorization":"Bearer "+ API_KEY,
                "Content-Type":"application/json"
            },
            //body:JSON.stringify(apiRequestBody)
            }).then((data)=>{
                return data.json();
            }).then((data)=>{
                console.log(data);
                    const desc="List of Loans available";
                        setMessages(
                            [
                                ...chatMessages,{
                                    message:desc,
                                    sender:"BankyBot"
                                }
                            ]
                        );
                        const arr=[];
                        for(let i=0;i<data.length;i++)
                        {
                         arr.push("type:"+data[i].type+" Loan amount:"+data[i].Loanamount);
                        }
                        setMessages(
                            [
                                ...chatMessages,{
                                    message:JSON.stringify(arr.toLocaleString()),
                                    sender:"BankyBot"
                                }
                            ]
                        );
                    
                setTyping(false);
            })
       }
       else 
       {
        const systemMessage = {
            role:"system",
            content:"Explain all concepts"
        }
        const apiRequestBody = {
            "model":"gpt-3.5-turbo",
            "messages": [
              systemMessage,
              ...apimessages
            ]
          }
        await fetch("https://api.openai.com/v1/chat/completions",{
            method:"POST",
            headers:{
                "Authorization":"Bearer "+ finacial_key,
                "Content-Type":"application/json"
            },
            body:JSON.stringify(apiRequestBody)
            }).then((data)=>{
                return data.json();
            }).then((data)=>{
                console.log(data);
                    const desc="List of Loans available";
                        const arr=[];
                        for(let i=0;i<data.length;i++)
                        {
                         arr.push("type:"+data[i].type+" Minimum age:"+data[i].Minimumage);
                        }
                        setMessages(
                            [
                                ...chatMessages,{
                                    message:data.choices[0].message.content,
                                    sender:"BankyBot"
                                }
                            ]
                        );
                    
                setTyping(false);
            })
       }
    }
  return (
    <div style={{backgroundColor:"aquamarine"}}>
     <p class="text-center ..."><h1 class="hover:animate-spin">Welcome to bankybot</h1></p>
    <div style={{height:"560px",width:"1000px",justifyContent:"center",textAlign:"center",marginLeft:"100px",borderRadius:"15px"}}>
        <MainContainer>
            <ChatContainer>
                <MessageList
                typingIndicator={typing?<TypingIndicator content="Banky is typing"/>:null}
                >
                 {messages.map((message,i)=>{
                  return <Message key={i} model={message}></Message>
                 })}
                </MessageList>
                <MessageInput  placeholder='Type Here' onSend={handlesend}>

                </MessageInput>
            </ChatContainer>
        </MainContainer>
    </div>
    </div>
  )
}
