(function () {

  var WB = wunderbits.core;
  var WBDeferred = WB.WBDeferred;
  var when = WB.lib.when;

  WL.apiActions = {

    'init': function (sdkInstance) {

      this.sdk = sdkInstance;
    },

    'destroySDK': function () {

      this.sdk && this.sdk.destroy();
      delete this.sdk;
    },

    'createList': function (title) {

      var self = this;
      var sdk = self.sdk;
      var deferred = new WBDeferred();

      sdk.getOutlet().lists.create({
        'title': title.split('\n').join(' ')
      })
      .done(function (listData) {

        self.addListToPositions(listData.id)
          .always(function () {

            deferred.resolve(listData);
          });
      })
      .fail(deferred.reject, deferred);

      return deferred.promise();
    },

    'addListToPositions': function (listID) {

      var self = this;
      var sdk = self.sdk;
      var deferred = new WBDeferred();
      var outlet = sdk.getOutlet();

      outlet.list_positions.all().done(function (listPositions) {

        var positions = listPositions[0];
        var values = positions.values;
        values.push(listID);

        // we simply want to make sure this gets out in parallel to task create
        outlet.list_positions.update(positions.id, positions.revision, {
          'values': values
        });

        deferred.resolve();
      })
      .fail(deferred.reject, deferred);

      return deferred.promise();
    },

    'createTask': function (listID, title, note, dueDate, reminderDate) {

      var self = this;
      var sdk = self.sdk;

      var deferred = new WBDeferred();

      if (listID && title) {

        var createData = {
          'list_id': parseInt(listID, 10),
          'title': title.split('\n').join(' ')
        };

        if (dueDate) {
          createData.due_date = dueDate;
        }

        sdk.getOutlet().tasks.create(createData)
          .done(function (taskData) {

            var requests = [];

            if (note) {
              requests.push(self.createNote(taskData.id, note));
            }

            if (reminderDate) {
              requests.push(self.createReminder(taskData.id, reminderDate));
            }

            requests.push(self.addTaskToPositions(taskData.id, listID));

            when(requests)
              .done(deferred.resolve, deferred)
              .fail(deferred.reject, deferred);
          })
          .fail(deferred.reject, deferred);
      }

      return deferred.promise();
    },

    'createNote': function (taskID, note) {

      var self = this;
      var sdk = self.sdk;

      return sdk.getOutlet().notes.create({
        'task_id': taskID,
        'content': note
      });
    },

    'createReminder': function (taskID, reminderDate) {

      var self = this;
      var sdk = self.sdk;

      console.log('original time', reminderDate);

      reminderDate = self.convertLocalTimeToServerTime(reminderDate);

      console.log('server time', reminderDate);

      return sdk.getOutlet().reminders.create({
        'task_id': taskID,
        'date': reminderDate
      });
    },

    'addTaskToPositions': function (taskID, listID) {

      var self = this;
      var sdk = self.sdk;
      var deferred = new WBDeferred();

      var outlet = sdk.getOutlet();

      outlet.settings.all().done(function (settings) {

        var locationSetting = _.findWhere(settings, {
          'key': 'new_task_location'
        });

        var topTop = locationSetting ? locationSetting.value === 'top' : true;

        outlet.task_positions.forList(listID).done(function (taskPositions) {

          var positions = taskPositions[0];
          var values = positions.values;

          values[topTop ? 'unshift' : 'push'](taskID);

          outlet.task_positions.update(positions.id, positions.revision, {
            'values': values
          })
          .done(deferred.resolve, deferred)
          .fail(deferred.reject, deferred);
        })
        .fail(deferred.reject, deferred);
      })
      .fail(deferred.reject, deferred);

      return deferred.promise();
    },

    'fetchLists': function () {

      var self = this;
      var outlet = self.sdk.getOutlet();
      var deferred = new WBDeferred();

      outlet.lists.accepted().done(function (lists) {

        outlet.list_positions.all().done(function (listPositions) {

          lists = self.sortLists(lists, listPositions[0].values);
          deferred.resolve(lists);
        });
      });

      return deferred.promise();
    },

    'sortLists': function (lists, values) {

      lists.sort(function (a, b) {

        if (a.list_type === 'inbox') {
          return -1;
        }
        else if (b.list_type === 'inbox') {
          return 1;
        }
        else {
          var aIdx = values.indexOf(a.id);
          var bIdx = values.indexOf(b.id);
          return aIdx < bIdx ? -1 : 1;
        }
      });

      return lists;
    },

    'convertLocalTimeToServerTime': function (timeStamp) {

      var serverTimestamp = moment(timeStamp)
        .add('minutes', moment(timeStamp).zone())
        .format('YYYY-MM-DDTHH:mm:ss');

      return serverTimestamp + 'Z';
    }
  };
})();