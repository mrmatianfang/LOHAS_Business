// pages/comment/index.js
import {
  request,
} from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop_comments:[],
    total_page: 0
  },

  // 接口要的参数
  QueryParams: {
    page_num: 1,
    page_size: 8,
  },

    // 获取公告列表
    async getCommentList() {
      const Comments = wx.getStorageSync('comment');
      if (!Comments) {
        // 不存在 发送请求获取数据
        this.getComment();
      } else {
        // 有旧的数据 判断过期时间
        if (Date.now() - Comments.time > 1000 * 10) {
          // 重新发送请求
          this.getComment();
        } else {
          // 可以使用旧数据
          this.setData({
            shop_comments: Comments
          });
        }
      }
  
      wx - wx.stopPullDownRefresh();
    },

      // 获取数据
  async getComment() {
    try {
      const res = await request({
        url: "/comment/getmine",
        method: "POST",
        data: this.QueryParams,
        header: {
          "content-type": "application/json",
          "token": wx.getStorageSync('token')
        }
      });
      if (res.statusCode == 200) {
        // 把接口数据存入本地缓存
        this.setData({
          // 拼接数组
          shop_comments: [...this.data.shop_comments, ...res.data.comment_item_list],
          total_page: res.data.total_page
        });
        wx - wx.setStorageSync('comment', {
          time: Date.now(),
          date: this.shop_comments
        });
      }
    } catch (error) {
      console.log(error);
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
    this.setData({
      shop_comments:[],
      total_page:0
    })
    this.getCommentList();
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
    // 重置数组
    this.setData({
      shop_comments: []
    })

    // 重置页码
    this.QueryParams.page_num = 1;
    // 发送请求
    this.getCommentList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("页面触底");
    // 判断还有没有下一页数据
    if (this.QueryParams.page_num < this.data.total_page) {
      // 还有下一页
      this.QueryParams.page_num += 1;
      this.getComment();
    } else {
      //没有下一页
      wx - wx.showToast({
        title: '已经到底啦',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})