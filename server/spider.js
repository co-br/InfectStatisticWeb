const superagent = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

const url = `https://ncov.dxy.cn/ncovh5/view/pneumonia`;
superagent
    .get(url)
    .then(res => {
        //console.log(res.text); //响应的内容，浏览器可以解析html 但是node端不行
        const $ = cheerio.load(res.text);
        //获取全国疫情数据
        var $getListByCountryTypeService1 = $('#getListByCountryTypeService1').html();
        //获取统计数据
        var $getStatisticsService = $('#getStatisticsService').html();
        //console.log($getListByCountryTypeService1);
        //使用eval
        var dataObj = {};
        eval($getListByCountryTypeService1.replace(/window/g, 'dataObj'));
        eval($getStatisticsService.replace(/window/g, 'dataObj'));
        //console.log(dataObj);
        //将获取到的数据写入本地
        fs.writeFile(path.join(__dirname, './data.json'), JSON.stringify(dataObj), err => {
            if (err) throw err;
            console.log("数据写入成功");
        })

    })
    .catch(err => {
        throw err;
    })