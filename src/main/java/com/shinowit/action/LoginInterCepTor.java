package com.shinowit.action;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;

import java.util.Map;

/**
 * Created by Administrator on 2014/12/14.
 */
public class LoginInterCepTor extends AbstractInterceptor {
    @Override
    public String intercept(ActionInvocation invocation) throws Exception {
        Map<String,Object> session=invocation.getInvocationContext().getSession();
        if(session.containsKey("operid")==false){
            return "fail";
        }else{
            return invocation.invoke();
        }
    }
}
