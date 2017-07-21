angular.module('app')
.factory('MessageService', ['$rootScope', '$pubnubChannel','currentUser',
  function MessageServiceFactory($rootScope,  $pubnubChannel, currentUser) {
 
    /* We create an extended $pubnubChannel channel object that 
        adds a additionnal sendMessage method that publishs the 
        current user's info along with the provided message content.
    */
    var Channel = $pubnubChannel.$extend({
      sendMessage: function(messageContent) {
         return this.$publish(
            {
              uuid: (Date.now() + currentUser.get().id.toString()),
              content: messageContent,
              sender: { 
                uuid: currentUser.get().id.toString(),
                login: currentUser.get().login
              },
              date: Date.now()
            }
          )
      }
    });

   return Channel('messages-channel-blog5', {autoload: 20, presence: true});

}]);
  