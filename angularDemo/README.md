图书漂流demo
包括app,web端
其中web端框架由panda编写
主要核心及贡献者为htc

## book cross api

```
教师登录查看课程列表
path: /spoc/course/r/0
method: GET or POST
params:
api: /spoc/course/r/0?managerId=000d7150-084c-4ca7-9161-810c05ebfe1d&state=1
response:
  {
    "message": "success",
    "result": [
        {
            "classFullName": "六年级七班",
            "classId": "a30c2e0c-ff8e-11e5-af77-7b163405cea9",
            "className": "七班",
            "createTime": 1468918667000,
            "id": "233",
            "name": "一元一次方程",
            "subjectId": "36566d30-0a4d-11e6-a3bd-b364ae20fc1d",
            "subjectName": "数学"
        }
    ],
    "code": 0
}
```
