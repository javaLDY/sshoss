package com.shinowit.dao;

import com.shinowit.entity.InsertTreeNode;
import com.shinowit.entity.TAuMenuInfo;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014-12-10.
 */
@Repository
public class InsertMenuDao {
    @Resource
    private SessionFactory sessionFactory;

    private void querySubModule(InsertTreeNode parentNode){
        Session session=sessionFactory.openSession();
        String hql="from TAuMenuInfo  where parentNode =?";
        Query query=session.createQuery(hql);
        query.setParameter(0,parentNode.getMenu().getMenuId());
        List<TAuMenuInfo> moduleList=query.list();
        session.close();
        for (TAuMenuInfo t:moduleList){
            InsertTreeNode tree=new InsertTreeNode();
            tree.setMenu(t);
            parentNode.addChild(tree);
            querySubModule(tree);
        }
    }

    @Transactional
    public InsertTreeNode querymenu(){
        InsertTreeNode result = new InsertTreeNode();
        Session session = sessionFactory.openSession();
        String sql = "select c.* from dbo.TAu_MenuInfo c where c.moudle is null";
        try{
            Query qeury = session.createSQLQuery(sql).addEntity(TAuMenuInfo.class);
            List<TAuMenuInfo> menulist = qeury.list();
            session.close();
            for(TAuMenuInfo tt : menulist){
                InsertTreeNode node = new InsertTreeNode();
                node.setMenu(tt);
                result.addChild(node);
                querySubModule(node);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return result;
    }
}
