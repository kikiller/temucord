import Api from './Api'
import PostController from './PostController'
import ServerController from './ServerController'
import ChannelController from './ChannelController'
import Settings from './Settings'
const Controllers = {
    Api: Object.assign(Api, Api),
PostController: Object.assign(PostController, PostController),
ServerController: Object.assign(ServerController, ServerController),
ChannelController: Object.assign(ChannelController, ChannelController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers