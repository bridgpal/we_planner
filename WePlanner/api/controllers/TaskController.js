/**
 * TaskController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  addTask:function(req,res){
    var taskData = {
      //below is where you add the req.body.fields from the form
      type:req.body.type,
      dt:req.body.dt,
      user1:req.body.user1,
      user2:req.body.user2,
      what:req.body.what,
      tags:req.body.tags,
      owner:req.session.user.id
    };
    Task.create(taskData).then(function(task){
      task.owner=req.session.user;
      res.send(task);
    }).catch(function(err){
      res.send(400,err);
    })
  },
  getTasks:function(req,res){
    Task.find({where:{owner:req.params.id}}).sort('dt ASC')
    .then(function(tasks){
      res.send(tasks);
    }).catch(function(err){
      res.send(400, err);
    })
  },
  //below is where we update on the backend
  updateTask:function(req,res){
    var taskData = {
      //below is where you add the req.body.fields from the form
      type:req.body.type,
      dt:req.body.dt,
      user1:req.body.user1,
      user2:req.body.user2,
      what:req.body.what,
      tags:req.body.tags,
      owner:req.session.user.id
    };
    Task.update({where:{owner:req.params.id , id:req.params.taskid}},taskData)
    .then(function(tasks){
      res.send(tasks);
    }).catch(function(err){
      res.send(400, err);
    })
  },
  deleteTask:function(req,res){
    Task.delete({where:{owner:req.params.id , id:req.params.taskid}},taskData)
    .then(function(tasks){
      res.send(tasks);
    }).catch(function(err){
      res.send(400, err);
    })
  }

};

