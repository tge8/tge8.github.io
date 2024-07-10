// themes/your-theme/source/js/mermaid-loader.js
document.addEventListener('DOMContentLoaded', function() {
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({ 
      startOnLoad: true,
      theme: 'default',
    themeVariables: {
      primaryColor: '#fbfbfb00', // 设置主要颜色，橙色
      primaryBorderColor: '#fc7171', // 设置边框颜色，白色
      primaryTextColor: '#000000', // 设置文本颜色，黑色
      edgeLabelBackground: '#000000', // 设置边缘标签背景颜色
      nodeTextColor: '#000000', // 设置节点文本颜色
      fontFamily: 'Muyao', // 设置字体
      fontSize: '16px' // 设置字体大小'
    },
    flowchart: {
      defaultLinkStyle: {
        stroke: '#04ff00', // 设置箭头颜色为绿色
        strokeWidth: 2,
        arrowheadColor: '#04ff00' // 设置箭头头部颜色为绿色
      }
    }
     });
  }
});
