package com.tablethrowers.fakedestroyer.util;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

@Component
public class DataAccessObject implements IDataAccessObject {

    @Autowired
    private EntityManager entityManager;

    @Transactional
    @Override
    public <T> void save(T c) {
        Session session = entityManager.unwrap(Session.class);
        session.saveOrUpdate(c);
    }

    @Transactional
    @Override
    public <T> T getById(Class<T> c, int id) {
        Session session = entityManager.unwrap(Session.class);
        T entity = session.get(c, id);

        return entity;
    }

    @Transactional
    @Override
    public <T> List<T> getAll(Class<T> c) {
        Session session = entityManager.unwrap(Session.class);
        Query<T> query = session.createQuery("from " + c.getSimpleName(), c);

        return query.getResultList();
    }

    @Transactional
    @Override
    public <T> boolean deleteByID(Class<T> c, int id) {
        Session session = entityManager.unwrap(Session.class);
        T entity = session.get(c, id);
        if (entity != null) {
            //session.delete(employee);
            Query query = session.createQuery("delete from" + c.getSimpleName() + "where id=:theid");
            query.setParameter("theid", id);
            query.executeUpdate();
            return true;
        }
        return false;
    }

    @Transactional
    @Override
    public <T> List<T> getByStringValue(Class<T> c, String key, String value) {
        Session session = entityManager.unwrap(Session.class);
        Query<T> query = session.createQuery("from " + c.getSimpleName() + " where " + key + "=\'" + value + "\'", c);
        List<T> results = query.getResultList();

        return results;
    }

    @Transactional
    @Override
    public <T> List<T> getByIntegerValue(Class<T> c, String key, int value) {
        Session session = entityManager.unwrap(Session.class);
        Query<T> query = session.createQuery("from " + c.getSimpleName() + " where " + key + "=" + value, c);
        List<T> results = query.getResultList();

        return results;
    }
};
