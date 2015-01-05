package com.shinowit.dao;

        import com.shinowit.entity.TAuMenuInfo;
        import com.shinowit.entity.TreeNode;

        import org.apache.struts2.ServletActionContext;
        import org.hibernate.Query;
        import org.hibernate.Session;
        import org.hibernate.SessionFactory;
        import org.springframework.stereotype.Repository;
        import org.springframework.transaction.annotation.Transactional;


        import javax.annotation.Resource;
        import java.util.List;

/**
 * Created by Administrator on 2014-12-05.
 */
@Repository
public class MenuDao {

    @Resource
    private SessionFactory sessionFactory;

    private void querySubModule(Integer operid,TreeNode parentNode){
        Session session=sessionFactory.openSession();
        String sql="select DISTINCT a.* from dbo.TAu_MenuInfo a " +
                "inner join dbo.TAu_Authorization b on a.MenuID=b.MenuID " +
                "inner join dbo.TAu_RoleInfo c on c.RoleID=b.RoleID " +
                "inner join dbo.TAu_OperInfo d on c.RoleID=d.RoleID where a.parent_node=? and d.OperID=?";
        Query query=session.createSQLQuery(sql).addEntity(TAuMenuInfo.class);
        query.setParameter(0,parentNode.getMenu().getMenuId());
        query.setParameter(1,operid);
        List<TAuMenuInfo> moduleList=query.list();
        session.close();
        for (TAuMenuInfo t:moduleList){
            TreeNode tree=new TreeNode();
            tree.setMenu(t);
            parentNode.addChild(tree);
            querySubModule(operid,tree);
        }
    }

    @Transactional
    public TreeNode querymenu(Integer operid){
        TreeNode result = new TreeNode();
        Session session = sessionFactory.openSession();
        String sql = "select DISTINCT a.* from dbo.TAu_MenuInfo a" +
                " inner join dbo.TAu_Authorization b on a.MenuID=b.MenuID" +
                " inner join dbo.TAu_RoleInfo c on c.RoleID=b.RoleID" +
                " inner join dbo.TAu_OperInfo d on c.RoleID=d.RoleID" +
                " where a.parent_node is null and d.OperID=?";
        try{
            Query qeury = session.createSQLQuery(sql).addEntity(TAuMenuInfo.class);
            qeury.setParameter(0,operid);
            List<TAuMenuInfo> menulist = qeury.list();
            session.close();
            for(TAuMenuInfo tt : menulist){
                TreeNode node = new TreeNode();
                node.setMenu(tt);
                result.addChild(node);
                querySubModule(operid,node);
            }
        }catch (Exception e){
            e.printStackTrace();
        }
        return result;
    }
}
