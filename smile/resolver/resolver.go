package resolver

import (
	"context"
	"github.com/99designs/gqlgen/graphql"
	"github.com/harapan21/Smile/smile"
	"github.com/harapan21/Smile/smile/db"
	"github.com/harapan21/Smile/smile/models"
	"github.com/vektah/gqlparser/gqlerror"
)

// Resolver THIS CODE IS A STARTING POINT ONLY. IT WILL NOT BE UPDATED WITH SCHEMA CHANGES.
type Resolver struct {
	posts []*models.Post
}

// Mutation for mutation
func (r *Resolver) Mutation() smile.MutationResolver {
	return &mutationResolver{r}
}

// Query for query
func (r *Resolver) Query() smile.QueryResolver {
	return &queryResolver{r}
}

type mutationResolver struct{ *Resolver }

func (r *mutationResolver) UserRegistration(ctx context.Context, input models.UserField) (*models.Auth, error) {
	auth, err := db.InsertQuery(&input)
	if err != nil {
		graphql.AddError(ctx, gqlerror.Errorf("failed Registration"))
	}
	return auth, nil
}
func (r *mutationResolver) LoginUser(ctx context.Context, input models.LoginUser) (*models.Auth, error) {
	auth, err := db.LoginQuery(&input)
	if err != nil {
		graphql.AddError(ctx, gqlerror.Errorf("failed Login"))
	}
	return auth, err
}
func (r *mutationResolver) Comment(ctx context.Context, input models.CommentField) (bool, error) {
	return false, nil
}
func (r *mutationResolver) Post(ctx context.Context, input models.PostField) (bool, error) {
	isPost, err := db.InserPost(&input)
	if err != nil {
		graphql.AddError(ctx, gqlerror.Errorf("failed Post"))
	}
	return isPost, nil
}
func (r *mutationResolver) EditUser(ctx context.Context, input models.UserField) (*models.User, error) {
	panic("not implemented")
}
func (r *mutationResolver) EditPost(ctx context.Context, input models.PostField) (*models.Post, error) {
	panic("not implemented")
}
func (r *mutationResolver) EditComment(ctx context.Context, input models.EditCommentField) (*bool, error) {
	panic("not implemented")
}
func (r *mutationResolver) RemoveByID(ctx context.Context, input *models.GenericInput) (*bool, error) {
	panic("not implemented")
}
func (r *mutationResolver) FindByID(ctx context.Context, input *models.GenericInput) (*bool, error) {
	panic("not implemented")
}

type queryResolver struct{ *Resolver }

func (r *queryResolver) Me(ctx context.Context) (*models.User, error) {
	panic("not implemented")
}
func (r *queryResolver) Post(ctx context.Context) ([]*models.Post, error) {
	panic("not implemented")
}
func (r *queryResolver) Trending(ctx context.Context) ([]*models.Post, error) {
	panic("not implemented")
}
func (r *queryResolver) Author(ctx context.Context) ([]*models.User, error) {
	panic("not implemented")
}
