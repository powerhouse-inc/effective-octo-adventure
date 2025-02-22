export PROJECT_ROOT=`pwd`
cd ../powerhouse/packages/common/
pnpm build
cd ../../apps/connect/
pnpm build:studio
cd $PROJECT_ROOT
ph connect