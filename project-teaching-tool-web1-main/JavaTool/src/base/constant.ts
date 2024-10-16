import _ from 'lodash'

const AID:string = '21419389378723787447'
const tomcatUrl:string = 'http://localhost:8081'

 const  getActToolUrl =	 ():string =>{
    let actToolUrl:string = (window as any).g_actToolUrl
    if(process.env.NODE_ENV === 'development'){
        return actToolUrl.replace(tomcatUrl,'')
    }else{
        return actToolUrl
    }
}

const getRunToolUrl = ():string =>{
    return (window as any).g_runToolUrl
}

const getForwardUrl = ():string =>{
    return (window as any).g_forwardUrl
}

const RESOURCE_URL:string = (window as any).g_resourceUrl

const USER_ID:string = (window as any).g_userId

const getAccessToken = ():string => {
    return (window as any).g_accessToken
}

const getBandId = ():number => {
    return (window as any).g_bandId
}

const PARAM:string = (window as any).g_param

const CLIENTYPE:string = (window as any).g_clientType

const TOOLID:string = (window as any).g_toolId

const CORE_URL:string = (window as any).g_coreUrl

/**
 * 获取吾托帮门户地址
 */
const GATEWAY_URL = ():string => {
    const domainUrl = _.truncate(getRunToolUrl(), {
        separator: 'tre',
        omission: ''
    })
    return domainUrl
}

const TRE_URL:string = GATEWAY_URL + '/tre/'

const RUN_SYSTEMTOOL_URL:string = GATEWAY_URL + '/tre/runSystemTool?'


/**
 * 判断当前设备类型
 */
 const isCurrentClient = (type:string) =>{
	var ua = navigator.userAgent,
    isWindowsPhone = /(?:Windows Phone)/.test(ua),
    isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
    isAndroid = /(?:Android)/.test(ua),
    isFireFox = /(?:Firefox)/.test(ua),
	isChrome = /(?:Chrome|CriOS)/.test(ua),
	//平板
    isTablet = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
    isPhone = /(?:iPhone)/.test(ua) && !isTablet,
	isPc = !isPhone && !isAndroid && !isSymbian,
	isWx = /(MicroMessenger)/.test(ua),
	isHtml5Plus = /(Html5Plus)/.test(ua);
	//判断是否为微信浏览器
	if(isWx && type == 'wx'){
		return true;
	}

	if(isPhone && type == "ios"){
		return true;
	}

	//判断是否为安卓系统
	if(type == "android" && isAndroid){
		return true;
	}

	//判断是否为APP客户端
	if (type == 'app' && (isAndroid || isPhone) && isHtml5Plus) {
		return true;
	} 

	//判断是否是移动端，移动端泛指APP客户端、移动端网页和微信浏览器
	if (type == 'mobile' && (isAndroid || isPhone || isTablet)) {
		return true;
	} 
	
	if(type == 'desktop' && isPc) {
		return true;
	}
	return false;
}

export { isCurrentClient, GATEWAY_URL, RUN_SYSTEMTOOL_URL, getActToolUrl, getRunToolUrl, getForwardUrl, CLIENTYPE, CORE_URL, TRE_URL, AID, getBandId, getAccessToken }
