const BrokerModel = require('../models/brokerModel.js');
 
 
module.exports =  {

   list(req , res) {
       BrokerModel.find({} , (err, brokers) => {
           if (err) {
               return res.status(500).json({
                   message: 'Error when getting broker.',
                   error: err
               });
           }
           return res.status(200).json(brokers);
       });
   },
   show(req , res) {
       BrokerModel.findById(req.params.id,  (err, broker) => {
           if (err) {
               return res.status(500).json({
                   message: 'Error when getting broker.',
                   error: err
               });
           }
           if (!broker) {
               return res.status(404).json({
                   message: 'No such broker'
               });
           }
           return res.status(200).json(broker);
       });
   },
   create(req , res) {
       let broker = new BrokerModel({
			brokerid : req.body.brokerid,
			brokerurl : req.body.brokerurl,
			clientcount : req.body.clientcount
       });
 
       broker.save((err, broker) =>  {
           if (err) {
               return res.status(500).json({
                   message: 'Error when creating broker',
                   error: err
               });
           }
           return res.status(201).json(broker);
       });
   },
   update(req , res) {
       BrokerModel.findById(req.params.id ,  (err, broker) =>  {
           if (err) {
               return res.status(500).json({
                   message: 'Error when getting broker',
                   error: err
               });
           }
           if (!broker) {
               return res.status(404).json({
                   message: 'No such broker'
               });
           }
           broker.brokerid = req.body.brokerid ? req.body.brokerid : broker.brokerid;
			broker.brokerurl = req.body.brokerurl ? req.body.brokerurl : broker.brokerurl;
			broker.clientcount = req.body.clientcount ? req.body.clientcount : broker.clientcount;
			
           broker.save((err, broker) => {
               if (err) {
                   return res.status(500).json({
                       message: 'Error when updating broker.',
                       error: err
                   });
               }
               return res.json(broker);
           });
       });
   },
   remove(req , res) {
       BrokerModel.findByIdAndRemove(req.params.id,  (err, broker) =>  {
           if (err) {
               return res.status(500).json({
                   message: 'Error when deleting the broker.',
                   error: err
               });
           }
           return res.status(204).json();
       });
   }
};

