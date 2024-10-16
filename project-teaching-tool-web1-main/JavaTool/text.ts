export const DEV_SCRIPT = `<script>
window.addEventListener('message', function (event) {
  var data = event.data;
  if (data.actionUrl) {
    window.g_actToolUrl = data.actionUrl;
    window.g_runToolUrl = data.runToolUrl;
    window.g_forwardUrl = data.forwardUrl;
    window.g_resourceUrl = data.resourceUrl;
    window.g_userId = data.userID;
    window.g_accessToken = data.accessToken;
    window.g_bandId = data.bandID;
    window.g_param = data.param;
    window.g_rtParam = data.rtParam;
    window.g_clientType = data.clientType;
    window.g_toolId = data.toolID;
    window.g_coreUrl = data.coreUrl;
    window.g_aid = data.aid;
  }
});
</script>`;

export const PROD_SCRIPT = `<script>
window.g_actToolUrl = '\${actionUrl}'; // 数据接口
window.g_runToolUrl = '\${runToolUrl}'; // 工具调用
window.g_forwardUrl = '\${forwardUrl}'; // 跳转接口
window.g_resourceUrl = '\${resourceUrl}'; // 静态资源
window.g_userId = '\${userID}'; // 当前用户账号
window.g_accessToken = '\${accessToken}'; // 当前用户的accessToken
window.g_bandId = '\${bandID}'; // 当前运行的帮区ID
window.g_param = '\${param}'; // 工具运行参数
window.g_rtParam = '\${toolParam}'; // 工具运行参数
window.g_clientType = '\${clientType}'; // 工具当前的运行平台
window.g_toolId = '\${toolID}'; // 工具的ID
window.g_coreUrl = '\${openInterfaceUrl}'; //开放接口
window.g_aid = '21419389378723787447';
</script>`;

export const PROD_MAIN_JSP_HEADER =
  '<%@ page import="java.util.*" contentType="text/html; charset=utf-8" %>';
