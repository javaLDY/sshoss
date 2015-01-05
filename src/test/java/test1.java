
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.AbstractJUnit4SpringContextTests;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

/**
 * Created by Administrator on 2014/12/15.
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:application-context.xml"})
public class test1 extends AbstractJUnit4SpringContextTests {
    @Resource
    private JdbcTemplate jt;
//    @Test
//    public void test(){
//        String sql =
//                "insert into dbo.TMe_MerchandiseInfo(ClickCount,Describe,MerchandiseAB,MerchandiseName,PicPath,price,Remark,SaleStatus,ProStatusID,UnitID,MerchandiseCID) values(11,'aa','123','hhh',123,'12','true','true',4,4,3)";
//        for(int a =0;a<100000;a++){
//            int b = jt.update(sql,new Object[]{},new int[]{});
//        }
//        System.out.println("aaaaaa");
//    }

    @Test
    public void test1(){
        String sql2 = "insert into dbo.TMe_InStockDetailsInfo values(12,12,134,9)";
        for(int d = 0;d<100000;d++){
            //int a = jt.update(sql,new Object[]{},new int[]{});
            //if(a>0){
               // int b = jt.queryForObject(sql1,Integer.class);
                //if(b>0){
                    int c = jt.update(sql2,new Object[]{},new int[]{});
                //}
            }
      //  }
        System.out.println("插入成功");

    }

}
