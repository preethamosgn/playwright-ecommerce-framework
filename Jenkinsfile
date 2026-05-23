pipeline {
    agent any

   parameters {
    choice(
        name: 'TEST_SUITE',
        choices: ['smoke', 'regression', 'all'],
        description: 'Select which test suite to run'
    )

    choice(
        name: 'BROWSER',
        choices: ['chromium', 'firefox', 'webkit', 'all'],
        description: 'Select browser for execution'
    )

    choice(
    name: 'HEADLESS',
    choices: ['true', 'false'],
    description: 'Run browser in headless mode'
)
}

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                bat 'npx playwright install'
            }
        }

        stage('Run Playwright Tests') {
    steps {
        script {
            echo "Selected Test Suite: ${params.TEST_SUITE}"
            echo "Selected Browser: ${params.BROWSER}"
            echo "Headless Mode: ${params.HEADLESS}"

            def testCommand = 'npx playwright test'

            if (params.TEST_SUITE == 'smoke') {
                testCommand = testCommand + ' --grep "@smoke"'
            } else if (params.TEST_SUITE == 'regression') {
                testCommand = testCommand + ' --grep "@regression"'
            }

            if (params.BROWSER != 'all') {
                testCommand = testCommand + " --project=${params.BROWSER}"
            }
            if (params.HEADLESS == 'false') {
                testCommand = testCommand + ' --headed'
            }
            echo "Final Command: ${testCommand}"

            bat testCommand
        }
    }
}
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**, test-results/**', allowEmptyArchive: true

            publishHTML([
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}