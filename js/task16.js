/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};






/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var sAqiCity=document.getElementById('aqi-city-input').value.trim();
	var sAqiValue=document.getElementById('aqi-value-input').value.trim();

	if (!sAqiCity.match(/^[A-Za-z\u4E00-\u9FA5]+$/)) {
		alert('城市名必须为中文字符');
        return;
	}
	if (!sAqiValue.match(/^\d+$/)) {
		alert('空气质量指数必须为整数');
        return;
	}


	aqiData[sAqiCity]=sAqiValue;
}






/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var oTab=document.getElementById('aqi-table');
	oTab.innerHTML='';


	for(var sAqiCity in aqiData){
		if(oTab.children.length===0){
            oTab.innerHTML='<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>';
        }
        var oTr=document.createElement('tr');

        var oTd1=document.createElement('td');
        oTd1.innerHTML=sAqiCity;
        oTr.appendChild(oTd1);

        var oTd2=document.createElement('td');
        oTd2.innerHTML=aqiData[sAqiCity];
        oTr.appendChild(oTd2);

        var oTd3=document.createElement('td');
        oTd3.innerHTML='<button class="del-Btn">删除</button>';//这里只能用class不能用id
        oTr.appendChild(oTd3);

        oTab.appendChild(oTr);
	}

}





/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}






/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(target) {
  // do sth.
    var oTr=target.parentElement.parentElement;
    var sCity=oTr.children[0].innerHTML;
    delete aqiData[sCity];

    renderAqiList();
}






function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var addBtn=document.getElementById('add-btn');
    addBtn.onclick=addBtnHandle;


  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var oTab=document.getElementById('aqi-table');
    var aDelBtn=document.getElementsByClassName('del-Btn');

    oTab.addEventListener("click",function (e) {
        if(e.target && e.target.nodeName === 'BUTTON'){
            delBtnHandle(e.target);
        }
    })

}





init();
