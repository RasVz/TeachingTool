
/**
 * axios 选项类
 */
export default class RequestOption{ 
    /**
     * 是否只返回一个对象，默认是false
     */
    public singleResult:boolean;
    /**
     * 是否刷新token，默认是true
     */
    public refreshToken?:boolean;
    /**
     * 
     */
    public pagination?:any;

    constructor(singleResult:boolean = false,refreshToken:boolean = true){
        this.singleResult = singleResult;
        this.refreshToken = refreshToken;
    }
    
} 