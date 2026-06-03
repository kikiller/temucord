import DirectMessageController from './DirectMessageController'
import FriendController from './FriendController'
import V1 from './V1'
import AuthController from './AuthController'
import ServerController from './ServerController'
import ChannelController from './ChannelController'
const Api = {
    DirectMessageController: Object.assign(DirectMessageController, DirectMessageController),
FriendController: Object.assign(FriendController, FriendController),
V1: Object.assign(V1, V1),
AuthController: Object.assign(AuthController, AuthController),
ServerController: Object.assign(ServerController, ServerController),
ChannelController: Object.assign(ChannelController, ChannelController),
}

export default Api