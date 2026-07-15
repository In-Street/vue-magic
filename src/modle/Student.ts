// 后端接口返回数据结构，此文件的定义被外部文件使用，所以需要export导出

export interface StudentInfo{
    id:number
    name:string
    age:number
    gender:number
}

export interface ListReult<T>{
    code:number,
    msg:string,
    data: T[]
}

export interface StudentQuery{
    name ?: string,
    gender ?: number,
    age ?: number[],
    pageNum: number,
    pageSize: number
}