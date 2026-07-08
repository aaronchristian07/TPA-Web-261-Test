PROTOC_GEN_GO       := $(shell go env GOPATH)/bin/protoc-gen-go
PROTOC_GEN_GO_GRPC  := $(shell go env GOPATH)/bin/protoc-gen-go-grpc

PROTO_FILES := $(shell find $(PROTO_DIR) -name "*.proto")

.PHONY: proto
proto: 
	mkdir gen
	protoc \
	--plugin=protoc-gen-go=$(PROTOC_GEN_GO) \
	--plugin=protoc-gen-go-grpc=$(PROTOC_GEN_GO_GRPC) \
	--proto_path=$(PROTO_DIR) \
	--go_out=gen \
	--go_opt=paths=source_relative \
	--go-grpc_out=gen \
	--go-grpc_opt=paths=source_relative \
	$(PROTO_FILES)