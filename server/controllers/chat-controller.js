const Chat = require('../models/chat-model');
const { ObjectId } = require('mongodb');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

async function fetchChat(req, res) {
  try {
    const { user } = req.params;
    const response = await openai.listEngines();
    const results = await Chat.find({ user: user }).sort({
      date: -1
    });

    res.status(200).json({ models: response.data, chats: results });
  } catch (error) {
    console.log(error);
  }
}

async function searchChat(req, res) {
  try {
    const { prompt, model, user } = req.body;
    const response = await openai.createCompletion({
      model: model,
      prompt: prompt,
      //temperature: 0,
      max_tokens: 500
    });

    const result = await Chat.insertMany([
      { text: prompt, date: new Date(), date: new Date(), user },
      { text: response.data.choices[0].text, date: new Date(), user }
    ]);

    if (result.length) {
      let chats = await Chat.find({ user }).sort({ date: -1 });
      res.status(200).json({ success: true, data: chats });
    } else {
      res.json({ success: false, msg: 'something wrong' });
    }
  } catch (error) {
    console.log(error);
  }
}

async function deleteChat(req, res) {
  const query = { _id: new ObjectId(req.params.id) };

  let result = await Chat.deleteOne(query);

  if (result.acknowledged) {
    res.status(200).json({ success: true });
  } else {
    res.json({ success: false, msg: 'something went wrong' });
  }
}

module.exports = { fetchChat, deleteChat, searchChat };
