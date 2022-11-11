import type { ISocial } from '~/types/social'

const colors: ISocial<string> = {
  dailymotion: '#0D0D0D',
  instagram: '#E4405F',
  facebook: '#1877F2',
  flickr: '#0063DC',
  giphy: '#FF6666',
  imgur: '#1BB76E',
  kickstarter: '#05CE78',
  linkedin: '#0A66C2',
  pinterest: '#BD081C',
  reddit: '#FF4500',
  snapchat: '#FFFC00',
  soundcloud: '#FF3300',
  spotify: '#1DB954',
  ted: '#E62B1E',
  tumblr: '#36465D',
  tiktok: '#000000',
  twitch: '#9146FF',
  twitter: '#1DA1F2',
  vimeo: '#1AB7EA',
  youtube: '#FF0000',

  unknown: '#000000',

}

const svg: ISocial<string> = {
  dailymotion: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Dailymotion</title><path d="M14.068 11.313c-1.754 0-3.104 1.427-3.104 3.11 0 1.753 1.35 3.085 3.255 3.085l-.016.002c1.59 0 2.925-1.31 2.925-3.04 0-1.8-1.336-3.157-3.062-3.157zM0 0v24h24V0H0zm20.693 20.807h-3.576v-1.41c-1.1 1.08-2.223 1.47-3.715 1.47-1.522 0-2.832-.495-3.93-1.485-1.448-1.275-2.198-2.97-2.198-4.936 0-1.8.7-3.414 2.01-4.674 1.17-1.146 2.595-1.73 4.185-1.73 1.52 0 2.69.513 3.53 1.59V4.157l3.693-.765V3.39l.002.003h-.002v17.414z"/></svg>',
  instagram: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Instagram</title><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>',
  facebook: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Facebook</title><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
  flickr: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Flickr</title><path d="M5.334 6.666C2.3884 6.666 0 9.055 0 12c0 2.9456 2.3884 5.334 5.334 5.334 2.9456 0 5.332-2.3884 5.332-5.334 0-2.945-2.3864-5.334-5.332-5.334zm13.332 0c-2.9456 0-5.332 2.389-5.332 5.334 0 2.9456 2.3864 5.334 5.332 5.334C21.6116 17.334 24 14.9456 24 12c0-2.945-2.3884-5.334-5.334-5.334Z"/></svg>',
  giphy: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GIPHY</title><path d="M2.666 0v24h18.668V8.666l-2.668 2.668v10H5.334V2.668H10L12.666 0zm10.668 0v8h8V5.334h-2.668V2.668H16V0"/></svg>',
  imgur: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Imgur</title><path d="M21.147 3.043c-.002-.113-.069-.182-.189-.191a14.117 14.117 0 00-.51-.045l-.162-.01a21.998 21.998 0 00-1.085-.046l-.217-.005c-.172-.003-.35-.004-.532-.004l-.189-.001c-.295 0-.601.003-.919.01l-.106.003a55.86 55.86 0 00-.87.026l-.237.009c-.335.013-.676.029-1.027.049l-.012.001c-.357.021-.724.045-1.095.071l-.275.021c-.304.023-.609.048-.92.076l-.25.021c-.38.035-.766.074-1.156.115-.08.009-.161.019-.242.027-.319.035-.641.073-.965.113l-.33.042c-.403.051-.806.105-1.212.164a.547.547 0 00-.154.045.303.303 0 00-.097.074l-.003.002c-.045.055-.047.12.004.179.003.004.002.008.005.012l3.488 3.456-6.629 6.596c-.069.067-.068.165 0 .251.856 1.093 1.44 1.793 2.143 2.492.699.703 1.398 1.286 2.493 2.143a.216.216 0 00.132.051.167.167 0 00.119-.051l6.597-6.629 3.455 3.488a.143.143 0 00.101.047c.096 0 .187-.118.212-.292.746-5.141.882-10.051.634-12.31z M15.87 24l6.356-6.357.026-.026.156-.155-.006-.006a3.144 3.144 0 00.822-1.711c.804-5.53.903-10.591.654-12.952a2.904 2.904 0 00-.834-1.812 2.96 2.96 0 00-1.816-.855C20.458.042 19.476 0 18.318 0c-2.999 0-6.667.284-10.063.777a3.143 3.143 0 00-1.887.991L0 8.137V24H15.87zm1.528-6.707c-.151 0-.563.405-.563.613a.1.1 0 01-.099.1.1.1 0 01-.099-.1c0-.208-.411-.613-.563-.613a.1.1 0 01-.099-.1c0-.054.044-.098.099-.098.152 0 .563-.404.563-.614 0-.055.044-.098.099-.098.054 0 .099.043.099.098 0 .21.412.614.563.614a.1.1 0 010 .198zM5.4 7.045c.197 0 .735-.528.735-.801a.13.13 0 01.128-.129c.071 0 .128.058.128.129 0 .272.538.801.735.801.071 0 .128.057.128.128a.128.128 0 01-.128.128c-.197 0-.735.528-.735.801a.128.128 0 01-.128.128.128.128 0 01-.128-.128c0-.273-.538-.801-.735-.801a.128.128 0 010-.256zm-3.99 3.26c0-.065.057-.098.119-.118.69-.228 1.269-.8 1.403-1.554.011-.064.053-.118.118-.118.066 0 .107.054.119.118.133.754.711 1.326 1.401 1.554.062.02.118.053.118.118s-.056.098-.118.119c-.69.227-1.269.799-1.403 1.553-.011.064-.053.119-.119.119-.065 0-.106-.054-.118-.119-.134-.754-.713-1.326-1.403-1.553-.061-.022-.117-.054-.117-.119zm1.565 9.307c-.113 0-.42.302-.42.459 0 .04-.034.073-.074.073a.074.074 0 01-.074-.073c0-.157-.307-.459-.42-.459a.074.074 0 01-.074-.073c0-.039.034-.073.074-.073.113 0 .42-.302.42-.457 0-.042.033-.073.074-.073.04 0 .074.031.074.073 0 .155.307.457.42.457.04 0 .073.034.073.073a.073.073 0 01-.073.073zm.568-3.047c-.14 0-.521.375-.521.568a.092.092 0 11-.183 0c0-.193-.381-.568-.521-.568a.09.09 0 01-.091-.09c0-.051.041-.092.091-.092.14 0 .521-.375.521-.568a.09.09 0 01.092-.09.09.09 0 01.091.09c0 .193.381.568.521.568a.091.091 0 010 .182zm3.334 4.382c-.203 0-.758.546-.758.827 0 .073-.06.133-.132.133a.133.133 0 01-.133-.133c0-.281-.555-.827-.758-.827a.134.134 0 01-.133-.133c0-.073.059-.132.133-.132.204 0 .758-.545.758-.828 0-.071.06-.132.133-.132.073 0 .132.061.132.132 0 .283.555.828.758.828.074 0 .133.059.133.132a.133.133 0 01-.133.133zm1.922-.806c-1.086-.851-1.869-1.498-2.653-2.287-.789-.784-1.436-1.566-2.287-2.654-.626-.8-.566-1.897.144-2.607l.001-.001.002-.001L9.364 7.26 7.149 5.066l-.003-.003-.002-.003c-.52-.52-.7-1.27-.472-1.958.148-.447.464-.802.867-1.049a1.983 1.983 0 01.371-.19 2.1 2.1 0 01.468-.131c.005 0 .009-.003.014-.004C11.746 1.24 15.363.96 18.317.96h.002c1.125 0 2.072.041 2.818.121.469.046.903.249 1.228.576.328.331.525.767.562 1.237.243 2.311.144 7.253-.651 12.714-.001.01-.006.016-.007.025a2.258 2.258 0 01-.18.586c-.006.014-.01.028-.018.042-.333.699-1.001 1.163-1.771 1.163-.51 0-.992-.2-1.358-.567l-.003-.002-.004-.004-2.192-2.215-5.333 5.359-.001.002h-.001a1.94 1.94 0 01-1.378.573c-.44 0-.877-.151-1.231-.429zm2.576 2.09c-.139 0-.518.373-.518.566a.09.09 0 01-.091.09.09.09 0 01-.09-.09c0-.193-.379-.566-.519-.566a.09.09 0 110-.18c.139 0 .519-.373.519-.566a.09.09 0 01.09-.09c.05 0 .091.041.091.09 0 .193.379.566.518.566.05 0 .091.039.091.09s-.04.09-.091.09zm2.115-2.437c.248 0 .922-.662.922-1.003 0-.088.072-.161.161-.161.088 0 .161.073.161.161 0 .341.674 1.003.921 1.003.089 0 .161.073.161.161a.16.16 0 01-.161.161c-.247 0-.921.662-.921 1.005a.162.162 0 01-.161.162.162.162 0 01-.161-.162c0-.343-.674-1.005-.922-1.005a.161.161 0 010-.322z"/></svg>',
  kickstarter: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Kickstarter</title><path d="M7.168 0c-3.2 0-5.797 2.579-5.797 5.758v12.484C1.371 21.42 3.968 24 7.168 24c1.981 0 3.716-.978 4.768-2.479l.794.79c2.26 2.245 5.943 2.245 8.203 0a5.724 5.724 0 001.696-4.075 5.724 5.724 0 00-1.696-4.074l-2.182-2.168 2.182-2.156a5.724 5.724 0 001.696-4.074 5.724 5.724 0 00-1.696-4.074c-2.26-2.246-5.942-2.246-8.203 0l-.794.789A5.797 5.797 0 007.168 0Z"/></svg>',
  linkedin: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  pinterest: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Pinterest</title><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>',
  reddit: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Reddit</title><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>',
  snapchat: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Snapchat</title><path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z"/></svg>',
  soundcloud: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>SoundCloud</title><path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c0-.057-.045-.1-.09-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.165 1.308c0 .055.045.094.09.094s.089-.045.104-.104l.21-1.319-.21-1.334c0-.061-.044-.09-.09-.09m1.83-1.229c-.061 0-.12.045-.12.104l-.21 2.563.225 2.458c0 .06.045.12.119.12.061 0 .105-.061.121-.12l.254-2.474-.254-2.548c-.016-.06-.061-.12-.121-.12m.945-.089c-.075 0-.135.06-.15.135l-.193 2.64.21 2.544c.016.077.075.138.149.138.075 0 .135-.061.15-.15l.24-2.532-.24-2.623c0-.075-.06-.135-.135-.135l-.031-.017zm1.155.36c-.005-.09-.075-.149-.159-.149-.09 0-.158.06-.164.149l-.217 2.43.2 2.563c0 .09.075.157.159.157.074 0 .148-.068.148-.158l.227-2.563-.227-2.444.033.015zm.809-1.709c-.101 0-.18.09-.18.181l-.21 3.957.187 2.563c0 .09.08.164.18.164.094 0 .174-.09.18-.18l.209-2.563-.209-3.972c-.008-.104-.088-.18-.18-.18m.959-.914c-.105 0-.195.09-.203.194l-.18 4.872.165 2.548c0 .12.09.209.195.209.104 0 .194-.089.21-.209l.193-2.548-.192-4.856c-.016-.12-.105-.21-.21-.21m.989-.449c-.121 0-.211.089-.225.209l-.165 5.275.165 2.52c.014.119.104.225.225.225.119 0 .225-.105.225-.225l.195-2.52-.196-5.275c0-.12-.105-.225-.225-.225m1.245.045c0-.135-.105-.24-.24-.24-.119 0-.24.105-.24.24l-.149 5.441.149 2.503c.016.135.121.24.256.24s.24-.105.24-.24l.164-2.503-.164-5.456-.016.015zm.749-.134c-.135 0-.255.119-.255.254l-.15 5.322.15 2.473c0 .15.12.255.255.255s.255-.12.255-.27l.15-2.474-.165-5.307c0-.148-.12-.27-.271-.27m1.005.166c-.164 0-.284.135-.284.285l-.103 5.143.135 2.474c0 .149.119.277.284.277.149 0 .271-.12.284-.285l.121-2.443-.135-5.112c-.012-.164-.135-.285-.285-.285m1.184-.945c-.045-.029-.105-.044-.165-.044s-.119.015-.165.044c-.09.054-.149.15-.149.255v.061l-.104 6.048.115 2.449v.008c.008.06.03.135.074.18.058.061.142.104.234.104.08 0 .158-.044.209-.09.058-.06.091-.135.091-.225l.015-.24.117-2.203-.135-6.086c0-.104-.061-.193-.135-.239l-.002-.022zm1.006-.547c-.045-.045-.09-.061-.15-.061-.074 0-.149.016-.209.061-.075.061-.119.15-.119.24v.029l-.137 6.609.076 1.215.061 1.185c0 .164.148.314.328.314.181 0 .33-.15.33-.329l.15-2.414-.15-6.637c0-.12-.074-.221-.165-.277m8.934 3.777c-.405 0-.795.086-1.139.232-.24-2.654-2.46-4.736-5.188-4.736-.659 0-1.305.135-1.889.359-.225.09-.27.18-.285.359v9.368c.016.18.15.33.33.345h8.185C22.681 17.218 24 15.914 24 14.28s-1.319-2.952-2.938-2.952"/></svg>',
  spotify: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Spotify</title><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>',
  ted: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>TED</title><path d="M0 7.664v2.223h2.43v6.449H5.1v-6.45h2.43V7.665zm7.945 0v8.672h7.31v-2.223h-4.638v-1.08h4.637v-2.066h-4.637v-1.08h4.637V7.664zm7.759 0v8.672h3.863c3.024 0 4.433-1.688 4.433-4.349 0-2.185-1.021-4.323-3.912-4.323zm2.672 2.223h.85c1.931 0 2.102 1.518 2.102 2.063 0 .815-.243 2.163-1.907 2.163h-1.045z"/></svg>',
  tiktok: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>TikTok</title><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>',
  tumblr: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Tumblr</title><path d="M14.563 24c-5.093 0-7.031-3.756-7.031-6.411V9.747H5.116V6.648c3.63-1.313 4.512-4.596 4.71-6.469C9.84.051 9.941 0 9.999 0h3.517v6.114h4.801v3.633h-4.82v7.47c.016 1.001.375 2.371 2.207 2.371h.09c.631-.02 1.486-.205 1.936-.419l1.156 3.425c-.436.636-2.4 1.374-4.156 1.404h-.178l.011.002z"/></svg>',
  twitch: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitch</title><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/></svg>',
  twitter: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>',
  vimeo: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Vimeo</title><path d="M23.9765 6.4168c-.105 2.338-1.739 5.5429-4.894 9.6088-3.2679 4.247-6.0258 6.3699-8.2898 6.3699-1.409 0-2.578-1.294-3.553-3.881l-1.9179-7.1138c-.719-2.584-1.488-3.878-2.312-3.878-.179 0-.806.378-1.8809 1.132l-1.129-1.457a315.06 315.06 0 003.501-3.1279c1.579-1.368 2.765-2.085 3.5539-2.159 1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.5069.5389 2.45 1.1309 3.674 1.7759 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.8679 3.434-5.7568 6.7619-5.6368 2.4729.06 3.6279 1.664 3.4929 4.7969z"/></svg>',
  youtube: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>YouTube</title><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
  unknown: '<svg></svg>'
}

export {
  colors,
  svg
}