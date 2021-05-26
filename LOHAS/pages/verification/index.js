// pages/verification/index.js
import {
  uploadFile,
  chooseImage
} from '../../utils/asyncWx.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
  },

  async afterRead(event) {
    try {
    const {
      file
    } = event.detail;
    const {
      fileList = []
    } = this.data;
    fileList.push({
      url: file.url,
      name: "verification"
    });
    this.setData({
      fileList: fileList
    })
    console.log(fileList)
    } catch (error) {
      console.log(error);
    }
  },

    // 删除预览图片
    onDeleteClick(e) {
      this.data.fileList.splice([e.detail.index], 1)
      this.setData({
        fileList: this.data.fileList
      });
      let img_list = []
      this.data.fileList.forEach(element => {
        img_list.push(element.url)
      });
      // 删除后的图片传给父组件，父组件setData赋值数据
      this.triggerEvent('dalete', img_list);
    },

  async onBottomClick(){
    console.log(this.data.fileList)
    if(this.data.fileList.length===0)
    {
      wx.showToast({
        icon:'error',
        title: '请先上传图片',
      })
    }
    else
    {
      wx.navigateBack({
        delta: 1,
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})